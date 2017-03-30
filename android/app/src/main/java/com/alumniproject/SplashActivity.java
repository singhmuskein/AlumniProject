package com.alumniproject;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
/**
 * Created by muskein.singh on 30/03/17.
 */

public class SplashActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // TODO Auto-generated method stub
        super.onCreate(savedInstanceState);
        setContentView(R.layout.launch_screen);

        Thread timerThread = new Thread(){
            public void run(){
                try{
                    sleep(1000);
                }catch(InterruptedException e){
                    e.printStackTrace();
                }finally{
                    Intent intent = new Intent(SplashActivity.this,MainActivity.class);
                    startActivity(intent);
                }
            }
        };
        timerThread.start();
    }

    @Override
    protected void onPause() {
        // TODO Auto-generated method stub
        super.onPause();
        finish();
    }

}