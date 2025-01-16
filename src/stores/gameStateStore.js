import {defineStore} from 'pinia'

export let useGameStateStore = defineStore('game', {
    state() {
        return {
            activeWord: 'THE',
            finalWord: 'WHERE',
            startWord: 'THE',
            wordPath: ['THE'],
            trashDisabled: true,
            authorsBest: 5,
            activeIndex: null
        }
    },
    actions: {
        // replace a letter in the active word at the given index
        replace(index, newLetter) {
            // this is to avoid casting null to 0
            if (index === null) {
                return;
            }
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    newWord += newLetter
                } else {
                    newWord += this.activeWord[i];
                }
            }
            this.checkIfWordIsValid(newWord)
        },
        // add a letter to the word at the given index
        add(index, newLetter) {
            // this is to avoid casting null to 0
            if (index === null) {
                return;
            }
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    newWord += newLetter
                }
                newWord += this.activeWord[i];
            }
            // then this must be in the last spot that exceeds the length of our word
            if (this.activeWord.length === newWord.length) {
                newWord += newLetter;
            }
            this.checkIfWordIsValid(newWord)
        },
        remove(index) {
            // this is to avoid casting null to 0
            if (index === null) {
                return;
            }
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    continue;
                }
                newWord += this.activeWord[i];
            }
            let {valid, code} = this.checkIfWordIsValid(newWord);
            if (valid.result === true) {
                this.updateActiveWord(newWord)
            }
            this.flashMessageOrExit(valid, code);

        },
        flashMessageOrExit(valid, code){

        },
        // called from each of the modifiers to see if we have a valid new word to add to the list and update our active word
        checkIfWordIsValid(newWord) {
            // word must be new
            if (this.activeWord === newWord) {
                return {
                    result: false,
                    code: 'is-same',
                }
            }
            // check dict
            if (!this.isARealWord(newWord)) {
                return {
                    result: false,
                    code: 'no-exist',
                }
            }
            return {
                result: true
            }
        },

        // update the active word, unset the currently selected index from the active word, add the new word to the list
        updateActiveWord(newWord) {
            this.activeWord = newWord;
            this.activeIndex = null;
            this.wordPath.push(this.activeWord);
        },

        // TODO implement dictionary
        isARealWord(newWord) {
            return true;
        }
    },
})
