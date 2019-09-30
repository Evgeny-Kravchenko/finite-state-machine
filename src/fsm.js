class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        /*Если нету аргумента, то выбрасываем ошибку.
        В противном случае создаём объект с заданными
        свойствами и методами*/
        if(config === undefined) {
            throw new Error("There is not argument");
        } else {
            //Состояние
            this.initial = config.initial;
            //Все состояние с цепочками
            this.states = config.states;
            //История переходов состояний
            this.history = ["normal"];
            //Указатель на состояние
            this.count = 0;
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    /*Возвращаем активное состояние студента*/
    getState() {
        return this.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    /*Принудительно меняем состояние студента и записываем
    это состояние в историю, поставив указатель на необходимую позицию*/
    changeState(state) {
        if(state in this.states) {
            this.initial = state;
            this.history.push(this.initial);
            this.count = this.history.length - 1;
        } else {
            throw new Error("State is not in this FSM");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    /*В зависимости от дейтсвия студента принимаем определённое состояние,
    записав его в историю и поставив на него указатель count.
    Если действия в данном состоянии нету, то выбрасываем ошибку*/
    trigger(event) {
        let nowInitial = this.initial;
        let states = this.states;
        if(event in states[nowInitial].transitions) {
            this.initial = states[nowInitial].transitions[event];
            /*Если состояние не повторяется с
            последним в истории, тогда пушим его в историю */
            if(this.history[this.history.length - 1] !== states[nowInitial].transitions[event]) {
                this.history.push(this.initial);
            }
            this.count++;
        } else {
            throw new Error("The Initial don't have so property");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    //Сбрасываем состояние на исходное
    reset() {
        this.initial = "normal";
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    /*Выводим все возможные состояния, в случае, если аргумент не передан.
    Если передано действие, то выводим состояния, которые имеют данное
    действие в виде массива*/
    getStates(event) {
        if(event === undefined) {
            return Object.keys(this.states);
        } else {
            let arrStatesValues = Object.entries(this.states);
            let arrStates = [];
            arrStatesValues.forEach(function(item) {
                if(event in item[1].transitions) {
                    arrStates.push(item[0]);
                }
            });
            return arrStates;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    //Делаем откат на 1 состояние назад по истории переместив указатель
    undo() {
        this.count--;
        if(this.count === -1) {
            this.count = 0;
            return false;
        } else {
            this.initial = this.history[this.count];
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    //Делаем переход на один указатель вперёд по истории
    redo() {
        this.count++;
        if(this.history[this.count]) {
            this.initial = this.history[this.count];
            return true;
        } else {
            return false;
        }
    }
    /**
     * Clears transition history
     */
    //Делаем очистку состояний, счётчика и истории
    clearHistory() {
        this.count = 0;
        this.history = ["normal"];
        this.initial = "normal";
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
