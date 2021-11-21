import React, { useEffect } from "react"
import { Games as games } from "../../data.json"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { setTitle } from "../../actions/TitleActions"
import { Text } from "react-native-magnus"
import { useDispatch } from "react-redux"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iGamesStackParamList, "GameList">

const GameList = (props: Props): JSX.Element => {
	const dispatch = useDispatch()
	const isFocused = useIsFocused()

	useEffect(() => {
		if (isFocused) {
			dispatch(setTitle("Memory Games"))
		}
	}, [isFocused])

	const handleTitle = (title: keyof typeof games) => {
		props.navigation.push("Game", { game: games[title] })
		dispatch(setTitle(title))
	}

	return (
		<SafeAreaView>
			<ScrollView>
				{(Object.keys(games) as (keyof typeof games)[]).map(title => (
					<View key={title}>
						<TouchableOpacity
							style={styles.touchable}
							onPress={() => handleTitle(title)}>
							<Text>{title}</Text>
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

export default GameList
