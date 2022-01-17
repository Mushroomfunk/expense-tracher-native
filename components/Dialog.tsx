import React, { useEffect, useState } from 'react';
import { height, width } from '../modules';
import { TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native';

const Dialog = ({ header, body, open, toggleDialog }) => {
	const [isOpen, setIsOpen] = useState(false);

	const onOpen = () => {
		toggleDialog();
	};
	const onClose = () => {
		toggleDialog();
	};

	useEffect(() => {
		if (open && !isOpen) setIsOpen(true);
		else if (!open && isOpen) setIsOpen(false);
	}, [open]);

	return isOpen ? (
		<>
			<View style={styles.backdrop}>
				<TouchableWithoutFeedback onPress={onClose} style={styles.closeTrigger}>
					<View style={styles.closeContainer} />
				</TouchableWithoutFeedback>
				<View>
					<View style={styles.container}>
						<View style={styles.header}>
							<Text style={styles.headerText}>{header}</Text>
						</View>
						<View style={styles.content}>{body}</View>
					</View>
				</View>
			</View>
		</>
	) : (
		<></>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		backgroundColor: 'rgba(0,0,0,0.6)',
		position: 'absolute',
		width: width,
		height: height,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2147483647,
	},
	container: {
		backgroundColor: 'white',
		borderRadius: 8,
		width: width * 0.85,
		marginTop: -150,
	},
	closeTrigger: {
		width: width,
		height: height,
	},
	closeContainer: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomColor: '#efefef',
		borderBottomWidth: 0.5,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		paddingBottom: 15,
	},
	headerText: {
		fontSize: 18,
	},
	content: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
	},
});

export default Dialog;
