import { ConsoleReporter } from '@serenity-js/console-reporter';
import { ArtifactArchiver } from '@serenity-js/core';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

import { Actors } from './main/Actors';

export const config: WebdriverIOConfig = {

    // =========================
    // Serenity/JS Configuration
    // =========================
    framework: '@serenity-js/webdriverio',

    serenity: {
        actors: new Actors(),
        runner: 'cucumber',
        // Configure reporting services
        crew: [
            //Photographer.whoWill(TakePhotosBeforeAndAfterInteractions),
            ArtifactArchiver.storingArtifactsAt(process.cwd(), 'target/site/serenity'), 
            ConsoleReporter.forDarkTerminals(),
            new SerenityBDDReporter(),
        ]
    },

    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './features/**/**/*.feature'
    ],
    exclude: [
    ],

    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    
    capabilities: [{
        'deviceName': 'Nexus_6',
        'platformName': 'Android',
        'platformVersion': '12',
        'automationName':'appium',
        'appPackage':'chiper.app',
        'appActivity': 'chiper.app.MainActivity',
        'autoGrantPermissions': true,
        'app': 'D:\\11.3.3-release.apk'
    }],
    // ===================
    // Test Configurations
    // ===================
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'debug',
    //
    // Set specific log levels per logger
    // loggers:
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    bail: 0,

    baseUrl: 'http://localhost:4023/wd/hub',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 1,

    // Test runner services
    /*
    services: [
        [
            'appium',
            {
                logPath : './target/',
                // For options see
                // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
                args: {
                    debugLogSpacing: true,
                },
                command: 'appium',
            },
        ],
    ],
    */

    port: 4723,
    path: '/wd/hub',

    cucumberOpts: {
        require: [
            './features/support/parameters.ts',
            './features/step-definitions/mobile/*.steps.ts'
        ],
        format: [ ],
        profile: '',
        strict: false,
        tags: ['@mobile'],
        timeout: 60000
    },
}
