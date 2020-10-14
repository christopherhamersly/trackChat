import React, {useEffect, useState} from 'react'
import { Dimensions, StyleSheet, Text, View} from 'react-native';
import socketIO from 'socket.io-client';
import {connect} from 'react-redux';

const socket = socketIO('https://trackchat.herokuapcomp.')