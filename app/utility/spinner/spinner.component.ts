'use strict';

import {Component, Input, OnDestroy} from 'angular2/core';

@Component({
    selector: 'my-spinner',
    templateUrl: 'app/utility/spinner/spinner.html',
    styleUrls: ['node_modules/spinkit/css/spinkit.css']
})
export class SpinnerComponent implements OnDestroy {
    private currentTimeout: number;
    private isDelayedRunning: boolean = false;

    @Input()
    public delay: number = 300;

    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
            return;
        }

        if (this.currentTimeout) {
            return;
        }

        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }

    ngOnDestroy(): any {
        this.cancelTimeout();
    }
}
