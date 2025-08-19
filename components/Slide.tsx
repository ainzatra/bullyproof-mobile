import React from 'react'
import { Image, ImageSourcePropType, Text, View } from 'react-native'
import Dots from './Dots'
import NextButton from './NextButton'

interface SlideProps {
    title: string
    description: string
    index: number
    total: number
    width: number
    bgColor: string
    image: ImageSourcePropType
    onSkip: () => void
    onNext: () => void
}

const Slide = ({
  title,
  description,
  index,
  total,
  onSkip,
  onNext,
  width,
  bgColor,
  image
}: SlideProps) => {
  return (
    <View className='items-center pt-2' style={{ width }}>
      <View className="w-64 h-64 rounded-xl items-center justify-center mt-5">
        {/* <Text className="text-slate-500">Image placeholder</Text> */}
        <Image source={image} className='w-full h-full' />
      </View>

      <View className={`w-11/12 ${bgColor} rounded-xl p-5 mt-7 shadow-lg`}>
        <Dots total={total} active={index} />

        <Text className="text-white text-3xl font-bold text-center mb-2">{title}</Text>
        <Text className="text-white text-lg text-justify mb-4">{description}</Text>

        <View className="flex-row items-center justify-end">

          <NextButton onPress={onNext} isLast={index === total - 1} />
        </View>
      </View>
    </View>
  )
}

export default Slide