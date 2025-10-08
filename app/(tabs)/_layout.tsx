import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import AuthGuard from '../../components/AuthGuard';
import CustomTabBar from '../../components/CustomTabBar';

const _layout = () => {
  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="seek-help"
          options={{
            title: 'Seek Help',
          }}
        />
        <Tabs.Screen
          name="report"
          options={{
            title: 'Report',
          }}
        />
        <Tabs.Screen
          name="tips"
          options={{
            title: 'Tips',
          }}
        />
        <Tabs.Screen
          name="report/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Tabs>
    </AuthGuard>
  );
};

export default _layout;

const styles = StyleSheet.create({});
