import {Log, Task } from '@serenity-js/core';

export const finishTest = () => Task.where('Test Finished', Log.the('',''))
