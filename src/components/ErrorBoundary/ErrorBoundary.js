import React, {Component} from "react";
import ErrorIndicator from "../ErrorIndicator";

export default class ErrorBoundary extends Component {

    state = {
        hasErrors: false
    };

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
        this.setState({
            hasErrors: true
        })
    }

    render() {
        return this.state.hasErrors ? <ErrorIndicator/> : this.props.children;
    }
}