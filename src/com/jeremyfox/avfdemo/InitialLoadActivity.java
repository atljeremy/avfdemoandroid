package com.jeremyfox.avfdemo;

import org.apache.cordova.*;
import android.os.Bundle;

public class InitialLoadActivity extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
