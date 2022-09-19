import React, { useState, useEffect } from "react";
import {Appbar, Text} from 'react-native-paper';
import { Platform, StyleSheet, View, ScrollView } from 'react-native'
import { MarkdownView } from 'react-native-markdown-view'



function AboutScreen() {

  const[file, setFile] = useState();



  return (
    <View>

    <Appbar.Header>
      <Appbar.Content title="About" />
    </Appbar.Header>

    <ScrollView style={styles.container}>

      <MarkdownView>

        This is a sudoku app based on react native. Create your account, log in, and enjoy the game. This game has both easy and hard mode, all the puzzles are generated automatically. There is a hint function to tell you where the conflics are when you enter a wrong number. If finished, press the submit button and your score will be recorded. Check both local and global high scores on High Score page.  An express server interacting with MongoDB is deployed to heroku so players all around the world can play this game. Runs on both webpage and iOS.
        {'\n'}
        {'\n'}

        ![RN Logo](https://raw.githubusercontent.com/GodDamnGitHub/Sudoku/Release/img/e01.png =336x708){'\n'}
        ![RN Logo](https://raw.githubusercontent.com/GodDamnGitHub/Sudoku/Release/img/e02.png =336x708){'\n'}
        ![RN Logo](https://raw.githubusercontent.com/GodDamnGitHub/Sudoku/Release/img/e03.png =336x708){'\n'}
        ![RN Logo](https://raw.githubusercontent.com/GodDamnGitHub/Sudoku/Release/img/e04.png =336x708){'\n'}
        {'\n'}
        # Built With {'\n'}
          * React {'\n'}
          * React Native{'\n'}
          * AsyncStorage{'\n'}
          * Axios {'\n'}
          * MarkdownView {'\n'}

        
      </MarkdownView>   
    </ScrollView>

  </View>

  );
}

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  p1: {
    flex: 2,
    padding: 20,
    borderWidth: 3
  },
});