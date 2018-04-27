import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import moment from 'moment';

function Timer({ interval, style }) {
    const num = (n) => n < 10 ? '0' + n : n;
    const duration = moment.duration(interval);
    return (
        <View style={styles.timerContainer}>
            <Text style={style}>{num(duration.minutes())}:</Text>
            <Text style={style}>{num(duration.seconds())}.</Text>
            <Text style={style}>{num(Math.floor(duration.milliseconds() / 10))}</Text>
        </View>
    )
};

function TimerButtons({ title, color, background, border, onPress, disabled }) {
    return (
        <TouchableOpacity
            onPress={() => !disabled && onPress()}
            style={[styles.button, { backgroundColor: background }]}
            activeOpacity={disabled ? 1.0 : 0.5}
        >
            <View style={[styles.buttonBorder, { borderColor: border }]}>
                <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
};

function ButtonsRow({ children }) {
    return (
        <View style={styles.buttonsRow}>{children}</View>
    )
};

function Lap({ number, interval, fastest, slowest }) {
    const lapStyle = [
        styles.lapText,
        fastest && styles.fastest,
        slowest && styles.slowest
    ]
    return (
        <View style={styles.lap}>
            <Text style={lapStyle}>Lap {number}</Text>
            <Timer style={[lapStyle, styles.lapTimer]} interval={interval} />
        </View>

    )
};

function LapsTable({ intervals, timer }) {
    const finishedLaps = intervals.slice(1);
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    if (finishedLaps.length >= 2) {
        finishedLaps.forEach(lap => {
            if (lap < min) min = lap
            if (lap > max) max = lap
        })
    }
    return (
        <ScrollView style={styles.ScrollView}>
            {intervals.map((lap, index) => (
                <Lap
                    number={intervals.length - index}
                    key={intervals.length - index}
                    interval={index === 0 ? timer + lap : lap}
                    slowest={lap === max}
                    fastest={lap === min}
                />
            ))}
        </ScrollView>
    )
}
export default class TimerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            now: 0,
            intervals: []
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    static navigationOptions = {
        title: 'Timer'
    };
    start = () => {
        const now = new Date().getTime()
        this.setState({
            start: now,
            now,
            intervals: [0]
        })
        this.timer = setInterval(() => {
            this.setState({ now: new Date().getTime() })
        }, 100)
    };
    lap = () => {
        const timestamp = new Date().getTime();
        const { intervals, now, start } = this.state;
        const [firstLap, ...others] = intervals;
        this.setState({
            intervals: [0, firstLap + now - start, ...others],
            start: timestamp,
            now: timestamp
        })
    };
    stop = () => {
        clearInterval(this.timer)
        const { intervals, now, start } = this.state;
        const [firstLap, ...others] = intervals;
        this.setState({
            intervals: [firstLap + now - start, ...others],
            start: 0,
            now: 0
        })
    };
    reset = () => {
        this.setState({
            intervals: [],
            start: 0,
            now: 0
        })
    };
    resume = () => {
        const now = new Date().getTime();
        this.setState({
            start: now,
            now,
        })
        this.timer = setInterval(() => {
            this.setState({ now: new Date().getTime() })
        }, 100)
    }
    render() {
        const { navigate } = this.props.navigation;
        const { now, start, intervals } = this.state;
        const timer = now - start;
        let pic = {
            uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/14262-200.png'
        };
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Timer</Text>
                <Timer interval={intervals.reduce((total, current) => total + current, 0) + timer} style={styles.timer} />
                {intervals.length === 0 && (
                    <ButtonsRow>
                        <TimerButtons
                            title='Lap'
                            color='rgba(176, 178, 176, .4)'
                            background='#ffffff'
                            border='rgba(176, 178, 176, .4)'
                            disabled
                        />
                        <TimerButtons
                            title='Start'
                            color='rgb(65, 216, 65)'
                            background='#ffffff'
                            border='rgb(65, 216, 65)'
                            onPress={this.start}
                        />
                    </ButtonsRow>
                )}
                {start > 0 && (
                    <ButtonsRow>
                        <TimerButtons
                            title='Lap'
                            color='rgba(176, 178, 176, .8)'
                            background='#ffffff'
                            border='rgba(176, 178, 176, .8)'
                            onPress={this.lap}
                        />
                        <TimerButtons
                            title='Stop'
                            color='rgb(219, 4, 4)'
                            background='#ffffff'
                            border='rgb(219, 4, 4)'
                            onPress={this.stop}
                        />
                    </ButtonsRow>
                )}
                {intervals.length > 0 && start === 0 && (
                    <ButtonsRow>
                        <TimerButtons
                            title='Reset'
                            color='rgba(176, 178, 176, .8)'
                            background='#ffffff'
                            border='rgba(176, 178, 176, .8)'
                            onPress={this.reset}
                        />
                        <TimerButtons
                            title='Start'
                            color='rgb(65, 216, 65)'
                            background='#ffffff'
                            border='rgb(65, 216, 65)'
                            onPress={this.resume}
                        />
                    </ButtonsRow>
                )}
                <LapsTable intervals={intervals} timer={timer} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 25,
        backgroundColor: '#ffffff',
        paddingHorizontal: 25
    },
    text: {
        color: '#42bff4',
        fontSize: 40,
    },
    icon: {
        width: 100,
        height: 100,
        alignItems: 'center'
    },
    timer: {
        color: '#000000',
        fontSize: 80,
        fontWeight: '200',
        paddingTop: 40,
        width: 113
    },
    timerContainer: {
        flexDirection: 'row'
    },
    button: {
        width: 90,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        fontSize: 30,
        fontWeight: '300',
    },
    buttonBorder: {
        width: 90,
        height: 50,
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginTop: 50,
        marginBottom: 30
    },
    lapText: {
        color: '#000000',
        fontSize: 20,
    },
    lap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'rgb(176, 178, 176)',
        borderTopWidth: 2,
        paddingVertical: 10
    },
    lapTimer: {
        width: 35
    },
    ScrollView: {
        alignSelf: 'stretch'
    },
    fastest: {
        color: 'rgb(65, 216, 65)'
    },
    slowest: {
        color: 'rgb(219, 4, 4)'
    }
});
