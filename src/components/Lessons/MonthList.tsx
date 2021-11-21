import React, { useEffect } from "react"
import { Lessons as lessons } from "../../data.json"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { setTitle } from "../../actions/TitleActions"
import { Text } from "react-native-magnus"
import { useDispatch } from "react-redux"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iLessonsStackParamList, "MonthList">

const MonthList = (props: Props): JSX.Element => {
	//#region Hooks
	const dispatch = useDispatch()
	const isFocused = useIsFocused()
	//#endregion

	//#region Effects
	useEffect(() => {
		if (isFocused) {
			dispatch(setTitle("Lessons"))
		}
	}, [isFocused])
	//#endregion

	//#region Functions
	const handleMonth = (month: number) => {
		props.navigation.push("DayList", { month })
	}
	//#endregion

	return (
		<SafeAreaView>
			<ScrollView>
				{lessons
					.map((_, i) => i + 1)
					.map(month => (
						<View key={month}>
							<TouchableOpacity
								style={styles.touchable}
								onPress={() => handleMonth(month)}>
								<Text>Month {month}</Text>
							</TouchableOpacity>
						</View>
					))}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	touchable: {
		padding: 20,
		marginTop: 8,
		marginStart: 10,
		marginEnd: 10,
		borderRadius: 10,
		backgroundColor: "#fefefe"
	}
})

export default MonthList
