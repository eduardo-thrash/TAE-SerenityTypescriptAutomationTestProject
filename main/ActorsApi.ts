import { Actor, Cast, TakeNotes } from '@serenity-js/core';
import { CallAnApi } from '@serenity-js/rest';

export class Actors implements Cast {
    prepare(actor: Actor): Actor {
        return actor.whoCan(
            TakeNotes.usingAnEmptyNotepad(),
            CallAnApi.at('https://staging.api.chiper.co')
        );
    }
}