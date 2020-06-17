"use strict";

class Steps {
    constructor(wizard) {
        this.wizard = wizard;
        this.steps = this.getSteps();
        this.stepsQuantity = this.getStepsQuantity();
        this.currentStep = 0;
    }

    setCurrentStep(currentStep) {
        this.currentStep = currentStep;
    }

    getSteps() {
        return this.wizard.getElementsByClassName('step');
    }

    getStepsQuantity() {
        return this.getSteps().length;
    }

    handleConcludeStep() {
        this.steps[this.currentStep].classList.add('-completed');
    }

    handleStepsClasses(movement) {

        if (movement > 0) {
            this.steps[this.currentStep - 1].classList.add('-completed');
            this.steps[this.currentStep].classList.add("-active")
        } else if (movement < 0) {
            this.steps[this.currentStep].classList.remove('-completed');
            this.steps[this.currentStep + 1].classList.remove("-active")
        } else if (this.currentStep == 0)
            this.steps[this.currentStep].classList.add("-active");
    }

}

class Panels {
    constructor(wizard) {
        this.wizard = wizard;
        this.panelWidth = this.wizard.offsetWidth;
        this.panelsContainer = this.getPanelsContainer();
        this.panels = this.getPanels();
        this.currentStep = 0;

        this.updatePanelsPosition(this.currentStep);
        this.updatePanelsContainerHeight();

    }

    getCurrentPanelHeight() {
        return `${this.getPanels()[this.currentStep].offsetHeight}px`;
    }

    getPanelsContainer() {
        return this.wizard.querySelector('.panels');
    }

    getPanels() {
        return this.wizard.getElementsByClassName('panel');
    }

    updatePanelsContainerHeight() {
        // this.panelsContainer.style.height = this.getCurrentPanelHeight();
    }

    updatePanelsPosition(currentStep) {
        const panels = this.panels;
        const panelWidth = this.panelWidth;

        for (let i = 0; i < panels.length; i++) {
            panels[i].classList.remove('movingIn', 'movingOutBackward', 'movingOutFoward');

            if (i !== currentStep) {
                if (i < currentStep) panels[i].classList.add('movingOutBackward');
                else if (i > currentStep) panels[i].classList.add('movingOutFoward');
            } else {
                panels[i].classList.add('movingIn');

            }
            let modal = document.getElementById("termsModal");
            if (currentStep == 1) {
                //showing 

                modal.style.display = "block";
            } else {
                modal.style.display = "none";
            }
            if (currentStep == 6)
                this.startProgressBar();
            else if (currentStep == 7) {
                document.querySelector(".success_wrapper").style.display = "block"
            } else {
                document.querySelector(".success_wrapper").style.display = "none"
            }
        }

        this.updatePanelsContainerHeight();
    }

    startProgressBar() {
        let bar = document.querySelector("#loading-bar");
        let progress = document.querySelector("#progress");
        let reporter = document.querySelector("p > span");

        let processingTime = 800;
        let i = 0;
        setInterval(function() {

            if (i < 99) {
                i = i + Math.floor(Math.random() * (25 - 1));
                progress.style.width = i + "%";
                processingTime = Math.floor(Math.random() * (3000 - 800));
                if (i >= 99) {
                    i = 99;
                    // reporter.textContent = i;
                    bar.classList.add('complete');
                    processingTime = 1000;
                }
                // reporter.textContent = i;
            } else {
                i = 0;
                // progress.style.width = i + "%";
                // reporter.textContent = i;
                bar.classList.remove('complete');
                processingTime = Math.floor(Math.random() * (3000 - 800));
            };

        }, processingTime);
    }

    setCurrentStep(currentStep) {
        this.currentStep = currentStep;
        this.updatePanelsPosition(currentStep);
    }

}

class Wizard {
    constructor(obj) {
        this.wizard = obj;
        this.panels = new Panels(this.wizard);
        this.steps = new Steps(this.wizard);
        this.stepsQuantity = this.steps.getStepsQuantity();
        this.currentStep = this.steps.currentStep;
        this.concludeControlMoveStepMethod = this.steps.handleConcludeStep.bind(this.steps);
        this.wizardConclusionMethod = this.handleWizardConclusion.bind(this);
    }

    updateButtonsStatus() {
        if (this.currentStep === 0) {
            // this.previousControl.classList.add('disabled');
            this.previousControl.style.display = 'none'
        } else {
            // this.previousControl.classList.remove('disabled');
            this.previousControl.style.display = '';
        }
    }

    updtadeCurrentStep(movement) {
        this.currentStep += movement;
        this.steps.setCurrentStep(this.currentStep);
        this.panels.setCurrentStep(this.currentStep);
        this.handleNextStepButton();
        this.updateButtonsStatus();
    }

    handleNextStepButton() {
        if (this.currentStep === this.stepsQuantity - 1) {
            this.nextControl.innerHTML = 'Conclude!';
            this.nextControl.removeEventListener('click', this.nextControlMoveStepMethod);
            this.nextControl.addEventListener('click', this.concludeControlMoveStepMethod);
            this.nextControl.addEventListener('click', this.wizardConclusionMethod);
        } else {
            this.nextControl.innerHTML = 'Next';
            this.nextControl.addEventListener('click', this.nextControlMoveStepMethod);
            this.nextControl.removeEventListener('click', this.concludeControlMoveStepMethod);
            this.nextControl.removeEventListener('click', this.wizardConclusionMethod);
        }
    }

    handleWizardConclusion() {
        this.wizard.classList.add('completed');
    }

    addControls(previousControl, nextControl, reject, accept) {

        this.previousControl = previousControl;
        this.nextControl = nextControl;
        this.acceptControl = accept;
        this.rejectControl = reject;

        this.previousControlMoveStepMethod = this.moveStep.bind(this, -1);
        this.nextControlMoveStepMethod = this.moveStep.bind(this, 1);
        previousControl.addEventListener('click', this.previousControlMoveStepMethod);
        nextControl.addEventListener('click', this.nextControlMoveStepMethod);

        reject.addEventListener('click', this.previousControlMoveStepMethod);
        accept.addEventListener('click', this.nextControlMoveStepMethod);
        this.updateButtonsStatus();
        this.steps.handleStepsClasses(0);
    }

    moveStep(movement) {

        if (this.validateMovement(movement)) {
            this.updtadeCurrentStep(movement);
            this.steps.handleStepsClasses(movement);
        } else {
            throw 'This was an invalid movement';
        }
    }

    validateMovement(movement) {
        const fowardMov = movement > 0 && this.currentStep < this.stepsQuantity - 1;
        const backMov = movement < 0 && this.currentStep > 0;
        return fowardMov || backMov;
    }

}

(function() {
    let wizardElement = document.getElementById('wizard');
    let wizard = new Wizard(wizardElement);
    let buttonNext = document.querySelector('.next');
    let buttonPrevious = document.querySelector('.previous');
    let buttonAccept = document.querySelector('.accept')
    let buttonReject = document.querySelector('.reject')
    wizard.addControls(buttonPrevious, buttonNext, buttonReject, buttonAccept);
    // setTimeout(function() {
    //     alert("hello world");
    //     wizard.updatePanelsContainerHeight()
    // }, 3000);
})();