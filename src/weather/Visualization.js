import React from 'react';
import weather from 'npm-openweathermap';
import $ from 'jquery';
import { liquidFillGaugeDefaultSettings, loadLiquidFillGauge } from './weather';
import './Visualization.css';



class Visualization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rain: 20,
            humidity: 20,
            temperature: 20,
            wind: 20,
            pressure: 20,
            description: '',
            cityName: ''
        }
    }
    componentDidMount() {
        this.gauge1();
        this.gauge2();
        this.gauge3();
        this.gauge4();
        this.gauge5();
    }

    changeCityInput = (event) => {
        this.setState({
            cityName: event.target.value
        });
    }

    getWeather = () => {
        const { cityName } = this.props;

        weather.api_key = '6c0a61ffaadf7eb42bd12639fe51b8c0';
        weather.get_weather_custom('city', cityName, 'weather')
            .then((response) => {
                const { main: { temp, pressure, humidity }, weather, wind } = response;
                const { description } = weather[0];

                this.setState({
                    temperature: temp - 273.15,
                    pressure,
                    humidity,
                    wind: wind.speed,
                    description
                });

                $("#fillgauge2 .liquidFillGaugeText").remove();
                this.gauge2();

                $("#fillgauge3 .liquidFillGaugeText").remove();
                this.gauge3();
                $("#fillgauge4 .liquidFillGaugeText").remove();
                this.gauge4();
                $("#fillgauge5 .liquidFillGaugeText").remove();
                this.gauge5();


                if (description === "clear sky") {
                    this.setState({ rain: 30 });
                    $("#fillgauge1 g path").remove();
                    $("#fillgauge1 .liquidFillGaugeText").remove();
                    this.gauge1();
                    let path = "https://s24526.pcdn.co/wp-content/uploads/2016/09/web1_Partly-sunny.jpg";
                    $("#fillgauge1").css(`background`, `url(${path})`);
                }
                else if (description === "slight rain") {
                    this.setState({ rain: 60 })
                    $("#fillgauge1 g path").remove();
                    $("#fillgauge1 .liquidFillGaugeText").remove();
                    this.gauge1();
                }
                else if (description === "few clouds") {
                    this.setState({ rain: 30 })
                    $("#fillgauge1 g path").remove();
                    $("#fillgauge1 .liquidFillGaugeText").remove();
                    this.gauge1();
                }
                else {
                    this.setState({ rain: 20 })
                    $("#fillgauge1 g path").remove();
                    $("#fillgauge1 .liquidFillGaugeText").remove();

                    this.gauge1();
                }

            }, (error) => {
                console.log(error);
            });

    }

    gauge1 = () => {
        liquidFillGaugeDefaultSettings();
        loadLiquidFillGauge("fillgauge1", this.state.rain);
    }

    gauge2 = () => {
        const config1 = liquidFillGaugeDefaultSettings();
        config1.circleColor = "#FF7777";
        config1.textColor = "#FF4444";
        config1.waveTextColor = "#FFAAAA";
        config1.waveColor = "#FFDDDD";
        config1.circleThickness = 0.2;
        config1.textVertPosition = 0.4;
        config1.waveAnimateTime = 1000;
        config1.displayPercent = false;
        loadLiquidFillGauge("fillgauge2", this.state.temperature, config1);
    }
    gauge3 = () => {
        const config2 = liquidFillGaugeDefaultSettings();
        config2.circleColor = "#D4AB6A";
        config2.textColor = "#553300";
        config2.waveTextColor = "#805615";
        config2.waveColor = "#AA39";
        config2.circleThickness = 0.1;
        config2.circleFillGap = 0.8;
        config2.textVertPosition = 0.8;
        config2.waveAnimateTime = 2000;
        config2.waveHeight = 0.35;
        config2.waveCount = 2;
        config2.displayPercent = false;

        loadLiquidFillGauge("fillgauge3", this.state.pressure, config2);
    }



    gauge4 = () => {
        const config3 = liquidFillGaugeDefaultSettings();
        config3.textVertPosition = 0.5;
        config3.waveAnimateTime = 5000;
        config3.waveHeight = 0.15;
        config3.waveAnimate = false;
        config3.waveOffset = 0.25;
        config3.valueCountUp = false;
        loadLiquidFillGauge("fillgauge4", this.state.humidity, config3);
    }

    gauge5 = () => {
        const config4 = liquidFillGaugeDefaultSettings();
        config4.circleThickness = 0.15;
        config4.circleColor = "#808015";
        config4.textColor = "#555500";
        config4.waveTextColor = "#FFFFAA";
        config4.waveColor = "#AAAA39";
        config4.textVertPosition = 0.8;
        config4.waveAnimateTime = 1000;
        config4.waveHeight = 0.05;
        config4.waveAnimate = true;
        config4.waveRise = false;
        config4.waveHeightScaling = false;
        config4.waveOffset = 0.25;
        config4.textSize = 0.75;
        config4.waveCount = 3;
        config4.displayPercent = false;

        loadLiquidFillGauge("fillgauge5", this.state.wind, config4);
    }

    render() {
        return (
            <div className="main">
                <h1>HealthGram</h1>
                <div>
                    <input onChange={this.changeCityInput} type="text" id="cityName" name="cityName" />
                    <button onClick={this.getWeather}>
                        Enter a city to get weather</button>
                    <div className="large-circle">
                        <svg id="fillgauge1"></svg>
                        <blockquote>Main</blockquote>
                    </div>
                    <div className="circle">
                        <svg id="fillgauge2"></svg>
                        <blockquote>temperature</blockquote>
                    </div>
                    <div className="circle">
                        <svg id="fillgauge3"></svg>
                        <blockquote>Pressure</blockquote>
                    </div>
                    <div className="circle">
                        <svg id="fillgauge4"></svg>
                        <blockquote>Humidity</blockquote>
                    </div>
                    <div className="circle">
                        <svg id="fillgauge5"></svg>
                        <blockquote>Wind Speed</blockquote>
                    </div>
                </div>
                <h3>Here</h3>
            </div>
        );
    }
}

export default Visualization;