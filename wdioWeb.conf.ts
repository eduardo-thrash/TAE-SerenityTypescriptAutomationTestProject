import { ConsoleReporter } from '@serenity-js/console-reporter';
import { ArtifactArchiver } from '@serenity-js/core';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import { Photographer, TakePhotosOfInteractions, WebdriverIOConfig } from '@serenity-js/webdriverio';

import { Actors } from './main';

export const config: WebdriverIOConfig = {

    // =========================
    // Serenity/JS Configuration
    // =========================

    framework: '@serenity-js/webdriverio',

    serenity: {
        actors: new Actors(),

        runner: 'cucumber',
        
        crew: [
            ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
            Photographer.whoWill(TakePhotosOfInteractions),     // slower execution, more comprehensive reports
            ConsoleReporter.forDarkTerminals(),
            new SerenityBDDReporter(),
        ]
    },

    headless: true,
    automationProtocol: 'webdriver',

    // ==================
    // Specify Test Files
    // ==================
    
    specs: [
        './features/**/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    // ============
    // Capabilities
    // ============
    maxInstances: 6,

    capabilities: [{

        browserName: 'chrome',
        acceptInsecureCerts: true,

        'goog:chromeOptions': {
            args: [
                '--disable-web-security',
                '--allow-file-access-from-files',
                '--allow-file-access',
                '--disable-infobars',
                '--ignore-certificate-errors',
                //'--headless',
                '--disable-gpu',
                '--window-size=320,700',
                '--disable-popup-blocking',
                '--use-mobile-user-agent',
            ]
        }
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'trace',

    bail: 0,
   
    baseUrl: 'https://staging.chiper.co/',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    
    connectionRetryTimeout: 120000,
    
    connectionRetryCount: 3,
    
    outputDir: 'target/web-logs',
    services: [
        [ 'chromedriver', {logFileName: 'wdio-chromedriver.log', // default
            outputDir: 'target/driver-logs' } ]
    ],

    cucumberOpts: {
        require: [
            './features/support/parameters.ts',
            './features/step-definitions/web/*.ts'
        ],
        format: [ ],
        
        profile: '',
        
        strict: false,
        
        tags: ['@web'],
        
        timeout: 60000,
    }
}
