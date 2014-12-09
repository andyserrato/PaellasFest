package com.Android_phonegap.PaellasFEST0;

import com.phonegap.*;
import android.os.Bundle;
import android.webkit.WebSettings.ZoomDensity;

public class PaellasFEST0alphaActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        
        super.appView.getSettings().setBuiltInZoomControls(true);
        super.appView.getSettings().setSupportZoom(true);
        super.appView.getSettings().setDefaultZoom(ZoomDensity.MEDIUM);
    }
}
