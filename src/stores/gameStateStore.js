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
        // index should always be passed
        modify(callback, params){
            console.log(callback);
            console.log(params);
            if(params.index === null){
                return
            }
            let candidateWord = this[callback](params);
            let {result, code} = this.checkIfWordIsValid(candidateWord);
            if (result === true) {
                this.updateActiveWord(candidateWord)
            }
            this.activeIndex = null;
            this.flash(result, code);
        },
        // replace a letter in the active word at the given index
        replace(params) {
            // this is to avoid casting null to 0
            let {index, letter} = params;
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    newWord += letter
                } else {
                    newWord += this.activeWord[i];
                }
            }
            return newWord;

        },
        // add a letter to the word at the given index
        add(params) {
            // this is to avoid casting null to 0
            let {index, letter} = params;
            console.log('Index', index);
            console.log('letter', letter);
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    newWord += letter
                }
                newWord += this.activeWord[i];
            }
            // then this must be in the last spot that exceeds the length of our word
            if (this.activeWord.length === newWord.length) {
                newWord += letter;
            }
            return newWord;
        },
        remove(params) {
            // this is to avoid casting null to 0
            let {index} = params;
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    continue;
                }
                newWord += this.activeWord[i];
            }
            return newWord;
        },

        flash(valid, code){
            console.log('Code:', code);
        },
        // called from each of the modifiers to see if we have a valid new word to add to the list and update our active word
        checkIfWordIsValid(candidateWord) {
            // word must be new
            if (this.activeWord === candidateWord) {
                return {
                    result: false,
                    code: 'is-same',
                }
            }
            // check dict
            if (!this.isARealWord(candidateWord)) {
                return {
                    result: false,
                    code: 'no-exist',
                }
            }
            return {
                result: true,
                code: 'success'
            }
        },

        // update the active word, unset the currently selected index from the active word, add the new word to the list
        updateActiveWord(newWord) {
            this.activeWord = newWord;
            this.wordPath.push(this.activeWord);
        },

        // TODO implement dictionary
        isARealWord(newWord) {
            return true;
        }
    },
})
