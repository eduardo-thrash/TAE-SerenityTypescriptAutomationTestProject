import { actorInTheSpotlight, Log, TestCompromisedError } from '@serenity-js/core'

export const Ensure = {
    that : {
        isEqualTo: (actual: number|string|boolean, expected: number|string|boolean, successMessage: string, errorMessage: string, show = true) => {
            Ensure.validateAssertion(Ensure.assertions.assertIsEqualsTo, actual, expected, successMessage, errorMessage,show)
        },
        isGreaterThan: (actual: number|string|boolean, expected: number|string|boolean, successMessage: string, errorMessage: string, show = true) => {
            Ensure.validateAssertion(Ensure.assertions.assertIsGreaterThan, actual, expected, successMessage, errorMessage,show)
        },
        isLessThan: (actual: number|string|boolean, expected: number|string|boolean, successMessage: string, errorMessage: string, show = true) => {
            Ensure.validateAssertion(Ensure.assertions.assertIsLessThan, actual, expected, successMessage, errorMessage,show)
        },
        isGreaterThanOrEqualTo: (actual: number|string|boolean, expected: number|string|boolean, successMessage: string, errorMessage: string, show = true) => {
            Ensure.validateAssertion(Ensure.assertions.assertIsGreaterThanOrEqualTo, actual, expected, successMessage, errorMessage,show)
        },
        isLessThanOrEqualTo: (actual: number|string|boolean, expected: number|string|boolean, successMessage: string, errorMessage: string, show = true) => {
            Ensure.validateAssertion(Ensure.assertions.assertIsLessThanOrEqualTo, actual, expected, successMessage, errorMessage,show)
        }
    },
    
    validateAssertion : (expectation: (actual: number|string|boolean, expected: number|string|boolean) => boolean, actual: number|string|boolean, expected: number|string|boolean, successMessage: string, errorMessage: string, show: boolean) => {
        if(expectation(actual, expected)){
            if(show){
                Log.the(`Assertion Passed => ${successMessage}`).performAs(actorInTheSpotlight())
            }
        } else {
            throw new TestCompromisedError(`${errorMessage} - Log => actual value: ${actual} - expected value: ${expected}`)
        }
    },
    
    assertions : {
        assertIsEqualsTo : (actual: number|string|boolean, expected: number|string|boolean): boolean => actual === expected,
        assertIsGreaterThan : (actual: number|string|boolean, expected: number|string|boolean): boolean => actual > expected,
        assertIsLessThan : (actual: number|string|boolean, expected: number|string|boolean): boolean => actual < expected,
        assertIsGreaterThanOrEqualTo : (actual: number|string|boolean, expected: number|string|boolean): boolean => actual >= expected,
        assertIsLessThanOrEqualTo: (actual: number|string|boolean, expected: number|string|boolean): boolean => actual <= expected
    }
}