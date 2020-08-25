import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Slider from 'react-native-slider'
import { theme, config } from '../constants'
import { calculateResult } from "../calculations/sip";
import { VictoryPie, VictoryLabel } from "victory-native"
import Svg from 'react-native-svg'

import 'intl'
import 'intl/locale-data/jsonp/en';

const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(value);


const PieChart = (props) => {
    let activeTab = props.active
    let result = 0

    let graphicData = [
        { x: 'Gain', y: 0 },
        { x: 'Invested', y: 0 }

    ]
    switch (activeTab) {
        case "SIP":

            result = calculateResult((props.investment).toFixed(0), 12, (props.returns).toFixed(0), (props.period).toFixed(0));
            graphicData[0]['y'] = result - props.investment
            graphicData[1]['y'] = props.investment

            console.log((props.returns).toFixed(0))

            console.log(result)
            break;

    }

    return (
        <View style={{ alignSelf: 'center' }}>

            <Svg width={300} height={300}>
                <VictoryPie

                    data={graphicData}
                    colorScale={[theme.colors.secondary, theme.colors.tertiary]}
                    animate={{
                        duration: 2000
                    }}
                    width={300}
                    height={300}
                    innerRadius={60}

                    labels={({ datum }) => `${datum.x}: ${numberFormat((datum.y).toFixed(0))}`}
                    style={{
                        labels: {
                            fill: 'black', fontSize: 15, padding: 7, fontWeight: 'bold'
                        },
                    }}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 14, fontWeight: "bold" }}
                    x={150} y={150}
                    text={`Total : ${numberFormat((result).toFixed(0))}`}
                />
            </Svg>

        </View>
    );
};

const styles = StyleSheet.create({


});
export { PieChart };
