import { Component, VERSION, OnInit, ViewChild } from '@angular/core';

import { NgxZxingComponent } from './modules/ngx-zxing/ngx-zxing.module';

import { Result } from '@barn/zxing';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

    ngVersion = VERSION.full;

    @ViewChild('scanner')
    scanner: NgxZxingComponent;

    hasCameras = false;
    qrResultString: string;
    qrResult: Result;

    availableDevices: MediaDeviceInfo[];
    selectedDevice: MediaDeviceInfo;

    ngOnInit(): void {

        this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
            this.hasCameras = true;

            // selects the devices's back camera by default
            // for (const device of devices) {
            //     if (/back|rear|environment/gi.test(device.label)) {
            //         this.scanner.changeDevice(device);
            //         this.selectedDevice = device;
            //         break;
            //     }
            // }
        });

        this.scanner.scanComplete.subscribe((result: Result) => {
            this.qrResult = result;
        });

    }

    displayCameras(cameras: MediaDeviceInfo[]) {
        console.log('Devices: ', cameras);
        this.availableDevices = cameras;
    }

    handleQrCodeResult(resultString: string) {
        console.log('Result: ', resultString);
        this.qrResultString = resultString;
    }

    onDeviceSelectChange(selectedValue: string) {
        console.log('Selection changed: ', selectedValue);
        this.selectedDevice = this.scanner.getDeviceById(selectedValue);
    }
}
