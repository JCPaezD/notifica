package com.jcpaezd.notifica;

import android.app.Activity;
import android.view.Window;
import android.view.WindowManager;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "KeepScreenOn")
public class KeepScreenOnPlugin extends Plugin {
    private boolean requestedEnabled = false;

    @PluginMethod
    public void setEnabled(PluginCall call) {
        requestedEnabled = call.getBoolean("enabled", false);
        Activity activity = getActivity();

        if (activity == null) {
            call.resolve();
            return;
        }

        activity.runOnUiThread(() -> {
            applyFlag(requestedEnabled);
            call.resolve();
        });
    }

    @Override
    protected void handleOnResume() {
        applyFlag(requestedEnabled);
    }

    @Override
    protected void handleOnPause() {
        applyFlag(false);
    }

    @Override
    protected void handleOnDestroy() {
        requestedEnabled = false;
        applyFlag(false);
    }

    private void applyFlag(boolean enabled) {
        Activity activity = getActivity();
        if (activity == null) return;

        Window window = activity.getWindow();
        if (enabled) {
            window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        } else {
            window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        }
    }
}
