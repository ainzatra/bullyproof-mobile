import { getBaseUrl } from '@/api/axios';
import {
  useUpdateAvatar,
  useUpdatePassword,
  useUpdateUserInfo,
} from '@/api/mutations';
import { useFetchUserInfo } from '@/api/queries';
import { DatePickerField, DropdownSelect } from '@/components/FormControls';
import { images } from '@/constants/images';
import { useSetUser, useUser } from '@/stores/useUserStore';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Profile screen wired to project's queries/mutations:
 * - useFetchUserInfo to fetch full profile
 * - useUpdateUserInfo to update non-password info
 * - useUpdateAvatar to upload avatar (separate API)
 * - useUpdatePassword to change password (separate API)
 *
 * Avatar selection uses expo-image-picker. API calls are connected to existing hooks in /api.
 */

export default function ProfileScreen() {
  const currentUser = useUser();
  const setUser = useSetUser();

  const userId = currentUser?.id ?? '';
  const token = currentUser?.token ?? '';

  const { data: userInfo, isLoading: loadingInfo } = useFetchUserInfo(
    token,
    userId,
  );

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');

  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('');
  const [guardianAddress, setGuardianAddress] = useState('');

  // Avatar
  const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Password modal
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  // API hooks
  const updateInfo = useUpdateUserInfo();
  const updateAvatar = useUpdateAvatar();
  const updatePassword = useUpdatePassword();

  // Helpers to format/parse birthday for display
  const formatDisplayDate = (iso?: string | null) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return String(iso);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const toIsoDate = (display: string) => {
    if (!display) return '';
    // If already ISO-ish YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(display)) return display;
    const d = new Date(display);
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }
    // fallback: return raw input so server receives something
    return display;
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name ?? '');
      setEmail(userInfo.email ?? '');
      // normalize birthday to ISO date (yyyy-mm-dd) — strip any timestamp (T...Z)
      setBirthday(
        userInfo.birthday ? String(userInfo.birthday).split('T')[0] : '',
      );
      setGender(userInfo.gender ?? '');
      setGrade(userInfo.grade ? String(userInfo.grade) : '');
      setSection(userInfo.section ?? '');

      setGuardianName(userInfo.guardian?.name ?? '');
      setGuardianPhone(userInfo.guardian?.phone ?? '');
      setGuardianEmail(userInfo.guardian?.email ?? '');
      setGuardianRelationship(userInfo.guardian?.relationship ?? '');
      setGuardianAddress(userInfo.guardian?.address ?? '');

      setAvatarUri(userInfo.avatar ?? undefined);
    }
  }, [userInfo]);

  const displayAvatarSource = useMemo(() => {
    if (avatarUri) return { uri: avatarUri };
    return images.logov2;
  }, [avatarUri]);

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Name is required');
      return;
    }
    // parse birthday display back to ISO YYYY-MM-DD if provided
    const birthdayIso = toIsoDate(birthday);
    if (birthday && !/^\d{4}-\d{2}-\d{2}$/.test(birthdayIso)) {
      Alert.alert('Validation', 'Birthday must be a valid date (YYYY-MM-DD)');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name,
        // email intentionally omitted to prevent updates
        birthday: birthdayIso,
        gender,
        grade: Number(grade),
        section,
        guardian: {
          name: guardianName,
          phone: guardianPhone,
          email: guardianEmail,
          relationship: guardianRelationship,
          address: guardianAddress,
        },
      };

      await updateInfo.mutateAsync({
        id: userId,
        token,
        payload,
      });

      // update minimal store so header/name reflect changes; do not overwrite email
      try {
        setUser({
          ...currentUser!,
          name,
        });
      } catch {
        // ignore if setUser not available
      }

      Alert.alert('Success', 'Profile updated');
      // router.back();
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const openAvatarPicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissions required',
        'Permission to access photos is required to change avatar.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    // Support both old and new result shapes
    if ((result as any).cancelled || (result as any).canceled) return;
    const asset = (result as any).assets?.[0];
    const uri = asset?.uri ?? (result as any).uri;
    if (!uri) return;

    // Update UI immediately
    setAvatarUri(uri);
    setAvatarUploading(true);

    try {
      const filename = asset?.fileName ?? uri.split('/').pop() ?? `avatar.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const ext = match ? match[1].toLowerCase() : 'jpg';
      let type = asset?.type
        ? asset.type.includes('/')
          ? asset.type
          : `image/${asset.type}`
        : `image/${ext === 'jpg' ? 'jpeg' : ext}`;

      const normalizedUri =
        Platform.OS === 'ios' && !uri.startsWith('file://') ? uri : uri;

      // Build FormData payload
      const formData = new FormData();
      formData.append('file', {
        uri: normalizedUri,
        name: filename,
        type,
      } as any);

      const response = await fetch(
        `${getBaseUrl()}/users/update-avatar/${userId}`,
        {
          method: 'PUT', // or "POST" depending on your backend
          headers: {
            Authorization: `Bearer ${token}`, // if you need auth
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('avatar udpate', result);
      if (result.url) {
        console.log('new s3 url', result.url);
        setUser({
          ...currentUser!,
          avatar: result.url,
        });
      }

      Alert.alert('Success', 'Avatar updated');
    } catch (err: any) {
      const result = err.json();
      console.log('Update avatar error', result);
      Alert.alert('Error', err?.message ?? 'Failed to upload avatar');
    } finally {
      setAvatarUploading(false);
      setAvatarModalVisible(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('Validation', 'Please provide old and new passwords');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Validation', 'New passwords do not match');
      return;
    }

    setChangingPassword(true);
    try {
      await updatePassword.mutateAsync({
        id: userId,
        token,
        payload: {
          old: oldPassword,
          new: newPassword,
          confirm: confirmPassword,
        },
      });
      setPasswordModalVisible(false);
      Alert.alert('Success', 'Password changed');
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loadingInfo) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mt-4">
          <TouchableOpacity
            onPress={openAvatarPicker}
            accessibilityRole="button"
          >
            <Image
              source={displayAvatarSource}
              className="w-28 h-28 rounded-full bg-slate-100"
            />
          </TouchableOpacity>
          <Text className="text-xs text-slate-500 mt-2">
            Tap avatar to change
          </Text>
        </View>

        {/* Personal information */}
        <View className="mt-6">
          <Text className="text-sm text-slate-500">Full name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="border rounded px-3 py-2 mt-2 text-slate-900"
            placeholder="Your full name"
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm text-slate-500">Email</Text>
          <TextInput
            value={email}
            editable={false}
            keyboardType="email-address"
            className="border rounded px-3 py-2 mt-2 text-slate-900 bg-slate-50"
            placeholder="you@example.com"
            autoCapitalize="none"
          />
        </View>

        <View className="mt-4 flex-row gap-3">
          <View className="flex-1">
            <Text className="text-sm text-slate-500">Birthday</Text>

            <DatePickerField
              value={birthday}
              onChange={(value) => setBirthday(value)}
              placeholder="Date of birth"
              additionalClass="border rounded px-3 py-2 mt-2 text-slate-900 bg-white"
            />
          </View>

          <View style={{ width: 12 }} />

          <View className="w-28">
            <Text className="text-sm text-slate-500">Gender</Text>
            <DropdownSelect
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' },
              ]}
              selectedValue={gender}
              onValueChange={setGender}
              placeholder="Select gender"
              additionalClass="border rounded px-3 py-2 mt-2 text-slate-900"
            />
          </View>
        </View>

        <View className="mt-4 flex-row gap-3">
          <View className="w-28">
            <Text className="text-sm text-slate-500">Grade</Text>
            <TextInput
              value={grade}
              onChangeText={setGrade}
              placeholder="Grade"
              keyboardType="number-pad"
              className="border rounded px-3 py-2 mt-2 text-slate-900"
            />
          </View>

          <View className="flex-1">
            <Text className="text-sm text-slate-500">Section</Text>
            <TextInput
              value={section}
              onChangeText={setSection}
              placeholder="Section"
              className="border rounded px-3 py-2 mt-2 text-slate-900"
            />
          </View>
        </View>

        {/* Guardian */}
        <Text className="text-sm text-slate-500 mt-6">Guardian / Parent</Text>
        <View className="mt-2">
          <TextInput
            value={guardianName}
            onChangeText={setGuardianName}
            placeholder="Full name"
            className="border rounded px-3 py-2 mt-2 text-slate-900"
          />
          <TextInput
            value={guardianEmail}
            onChangeText={setGuardianEmail}
            placeholder="Email"
            keyboardType="email-address"
            className="border rounded px-3 py-2 mt-2 text-slate-900"
          />
          <TextInput
            value={guardianPhone}
            onChangeText={setGuardianPhone}
            placeholder="Contact number"
            keyboardType="phone-pad"
            className="border rounded px-3 py-2 mt-2 text-slate-900"
          />
          <TextInput
            value={guardianRelationship}
            onChangeText={setGuardianRelationship}
            placeholder="Relationship"
            className="border rounded px-3 py-2 mt-2 text-slate-900"
          />
          <TextInput
            value={guardianAddress}
            onChangeText={setGuardianAddress}
            placeholder="Address"
            className="border rounded px-3 py-2 mt-2 text-slate-900"
          />
        </View>

        {/* Password / Avatar controls */}
        <View className="mt-6 gap-3">
          <TouchableOpacity
            onPress={() => setPasswordModalVisible(true)}
            className="px-4 py-3 rounded-md border border-slate-200 items-center justify-center bg-white"
          >
            <Text className="text-slate-800">Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* Save / Cancel */}
        <View className="mt-6 flex-row gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 px-4 py-3 rounded-full bg-slate-100 items-center justify-center"
          >
            <Text className="text-slate-700">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSaveProfile}
            disabled={saving}
            className="flex-1 px-4 py-3 rounded-full bg-primary-main items-center justify-center"
          >
            <Text className="text-white font-semibold">
              {saving ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Avatar modal (options) */}
      <Modal
        visible={avatarModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAvatarModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50"
          onPress={() => setAvatarModalVisible(false)}
        />
        <View className="bg-white rounded-t-3xl p-4">
          <Text className="text-lg font-semibold mb-4">Update Avatar</Text>
          <TouchableOpacity className="py-3" onPress={openAvatarPicker}>
            <Text>Choose from library</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3">
            <Text className="text-rose-600"></Text>
          </TouchableOpacity>

          <View className="mt-4">
            <TouchableOpacity
              onPress={() => setAvatarModalVisible(false)}
              className="py-3 items-center"
            >
              <Text className="text-slate-700">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Change password modal */}
      <Modal
        visible={passwordModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50"
          onPress={() => setPasswordModalVisible(false)}
        />
        <View className="bg-white rounded-t-3xl p-4">
          <Text className="text-lg font-semibold mb-4">Change Password</Text>

          <Text className="text-sm text-slate-500">Current password</Text>
          <TextInput
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
            className="border rounded px-3 py-2 mt-2 text-slate-900"
            placeholder="Current password"
          />

          <Text className="text-sm text-slate-500 mt-4">New password</Text>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            className="border rounded px-3 py-2 mt-2 text-slate-900"
            placeholder="New password"
          />

          <Text className="text-sm text-slate-500 mt-4">Confirm password</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            className="border rounded px-3 py-2 mt-2 text-slate-900"
            placeholder="Confirm new password"
          />

          <View className="mt-6 flex-row gap-3">
            <TouchableOpacity
              onPress={() => setPasswordModalVisible(false)}
              className="flex-1 px-4 py-3 rounded-full bg-slate-100 items-center justify-center"
            >
              <Text className="text-slate-700">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleChangePassword}
              disabled={changingPassword}
              className="flex-1 px-4 py-3 rounded-full bg-primary-main items-center justify-center"
            >
              <Text className="text-white font-semibold">
                {changingPassword ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
