/*
 * SPDX-License-Identifier: GPL-3.0
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 */

import { Settings } from "renderer/settings";

import { addPatch } from "./shared";

addPatch({
    patches: [
        {
            find: "SETTINGS_ADVANCED_HARDWARE_ACCELERATION]:",
            replacement: {
                // eslint-disable-next-line no-useless-escape
                match: /(?<=SETTINGS_ADVANCED_HARDWARE_ACCELERATION\]:.{0,150}predicate:\(\)=>)\i\.isPlatformEmbedded/,
                replace: "true"
            }
        },
        {
            find: "gpuSettings.setEnableHardwareAcceleration",
            replacement: [
                {
                    // eslint-disable-next-line no-useless-escape
                    match: /(?<=getEnableHardwareAcceleration:\(\)=>).{0,100}?(?=\.getEnableHardwareAcceleration)/,
                    replace: "$self"
                },
                {
                    // eslint-disable-next-line no-useless-escape
                    match: /(?<=setEnableHardwareAcceleration\(\i\)\{).{0,100}?(?=\.setEnableHardwareAcceleration)/,
                    replace: "$self"
                }
            ]
        }
    ],

    getEnableHardwareAcceleration() {
        return Settings.store.hardwareAcceleration;
    },
    setEnableHardwareAcceleration(v: boolean) {
        Settings.store.hardwareAcceleration = v;
        VesktopNative.app.relaunch();
    }
});
