import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, KeyboardAvoidingView, ScrollView, TouchableOpacity, AlertIOS } from 'react-native';
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

function MiniTimer({ interval, style }) {
    const num = (n) => n < 10 ? '0' + n : n;
    const duration = moment.duration(interval);
    return (
        <Text style={style}>{num(duration.minutes())}:{num(duration.seconds())}.{num(Math.floor(duration.milliseconds() / 10))}</Text>
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

    return (
        <View style={styles.lap}>
            <Text style={styles.lapText}>Lap {number}</Text>
            <Timer style={[styles.lapText, styles.lapTimer]} interval={interval} />
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
export default class StopwatchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            now: 0,
            end: ((this.props.intervalTime * this.props.exercises.length * this.props.sets + this.props.restTime * (this.props.sets - 1)) * 1000),
            intervals: [this.props.intervalTime],
            pause: false,
            currentInterval: this.props.intervalTime * 1000,
            exercises: this.props.exercises,
            currentExercise: this.props.exercises[0],
            newInsult: 'Are you ready?',
            leMeme: 'https://quotesdaily.net/wp-content/uploads/2017/10/most-funny-workout-quotes-memes-vault-ryan-gosling-workout-memes.jpg'
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    static navigationOptions = {
        title: 'Workout Timer'
    };
    countdown = (time, interval, exercises) => {
        const now = new Date().getTime();
        const total = now + time;
        // let intervalSet = this.props.exercises.map((exercise, idx) => interval * (idx + 1));
        let intervalSet = [];
        let prev = 0;
        let exerciseList = [];
        for (var i = 0; i < this.props.sets; i++) {
            this.props.exercises.forEach(() => {
                let time = interval + prev
                intervalSet.push(time);
                prev = time;
            })
            if (i !== this.props.sets - 1) {
                let rest = this.props.restTime * 1000 + prev
                intervalSet.push(rest);
                prev = rest;
            }
        }
        for (var x = 0; x < this.props.sets; x++) {
            exerciseList = exerciseList.concat(exercises);
            if (x !== this.props.sets - 1) {
                exerciseList.push('REST')
            }
        }
        this.setState({
            start: now,
            now,
            end: total,
            intervals: intervalSet,
            exercises: exerciseList
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
        const { intervals, now, start, end } = this.state;
        const [firstLap, ...others] = intervals;
        this.setState({
            intervals: [firstLap + now - start, ...others],
            start: start,
            now: now,
            end: end,
            pause: true
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
            pause: false
        })
        this.timer = setInterval(() => {
            this.setState({ now: new Date().getTime() })
        }, 100)
    };
    randomInsult = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    }
    render() {
        const { now, start, end, intervals } = this.state;
        const timer = end - now;
        const elapsed = now - start;
        let iTime = this.state.currentInterval;
        let lineUp = [];
        let meme = this.state.leMeme;
        for (let i = 1; i < this.props.sets; i++) {
            lineUp.concat(this.props.exercises);
            lineUp.push('REST');
        }
        if (elapsed > iTime) {

            let random = this.randomInsult(this.props.motivations.length);
            let meme = this.randomInsult(this.props.motivationalMemes.length)
            this.setState({
                intervals: this.state.intervals.slice(1),
                currentInterval: this.state.intervals[0],
                exercises: this.state.exercises.slice(1),
                currentExercise: this.state.exercises[0],
                newInsult: this.props.motivations[random],
                leMeme: this.props.motivationalMemes[meme]
            })
        }
        if (timer <= 0) {
            let random = this.randomInsult(this.props.finalWords.length);
            AlertIOS.alert(this.props.finalWords[random]);
            clearInterval(this.timer);
            this.setState({
                start: 0,
                now: 0,
                end: ((this.props.intervalTime * this.props.exercises.length * this.props.sets + this.props.restTime * (this.props.sets - 1)) * 1000),
                intervals: [this.props.intervalTime],
                pause: false,
                currentInterval: this.props.intervalTime * 1000,
                exercises: this.props.exercises,
                currentExercise: this.state.exercises[0]

            })
        }
        return (
            <View style={styles.container}>
                <Text style={styles.quote}>{this.state.newInsult}</Text>
                <Timer interval={iTime - elapsed} style={styles.timer} />
                <View style={styles.timesContainer}>
                    <View style={styles.options}>
                        <MiniTimer interval={elapsed} style={styles.smallText} />
                        <MiniTimer interval={timer} style={styles.smallText} />
                    </View>
                    <View style={styles.options}>
                        <Text style={styles.smallText}>Elapsed</Text>
                        <Text style={styles.middle}>{this.state.currentExercise}</Text>
                        <Text style={styles.smallText}>Remaining</Text>
                    </View>
                    <ButtonsRow>
                        <TimerButtons
                            title='Stop'
                            color='rgb(219, 4, 4)'
                            background='#ffffff'
                            border='rgb(219, 4, 4)'
                            onPress={this.stop}
                        />
                        {
                            !this.state.pause
                                ?
                                (<TimerButtons
                                    title='Start'
                                    color='rgb(65, 216, 65)'
                                    background='#ffffff'
                                    border='rgb(65, 216, 65)'
                                    onPress={() => this.countdown(this.state.end, iTime, this.props.exercises)}
                                />)
                                :
                                (<TimerButtons
                                    title='Start'
                                    color='rgb(65, 216, 65)'
                                    background='#ffffff'
                                    border='rgba(176, 178, 176, .8)'
                                    onPress={this.resume}
                                />)
                        }
                    </ButtonsRow>
                </View>
                <View styles={{ justifyContent: 'center' }}>
                    <Image source={{ uri: meme }} style={styles.meme} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 5,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20
    },
    quote: {
        color: 'rgb(229, 14, 6)',
        fontSize: 25,
        height: 100,
        justifyContent: 'center'
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
        width: 113
    },
    timesContainer: {
        width: 350,
        paddingTop: 0
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
        marginTop: 10,
        marginBottom: 10
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
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ffffff'
    },
    smallText: {
        color: '#000000',
        fontSize: 20,
        paddingHorizontal: 10,
        color: 'rgb(131, 132, 135)'
    },
    middle: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '500',
        paddingHorizontal: 10,
        color: '#42bff4'
    },
    meme: {
        width: 215,
        height: 215,
    }
});
