
       
       
    var angka = 0;
    var txt = null;
    var nilaiSenKiri = 1;
    var nilaiSenKanan = 1;

function OnStart() {
//app.SetOrientation( "Landscape" )
app.SetStatusBarColor( "black")
    // Buat elemen teks untuk menampilkan angka
    txt = app.CreateText("0");
    txt.SetFontFile("Misc/Seven Segment.ttf");
    txt.SetTextSize(122);
    txt.SetTextColor("#22ff22");

    // Buat elemen teks untuk menampilkan satuan (misalnya "km")
    var txtK = app.CreateText("km");
    txtK.SetTextColor("#22ff22");
    txtK.SetTextSize(20);
    
    // Buat layout linear dan tambahkan elemen teks ke dalamnya
   layMain=app.CreateLayout( "Absolute","VCenter,FillXY" )
    var lay = app.CreateLayout("Linear", "VCenter,FillXY");
    lay.AddChild(txt);
    lay.AddChild(txtK);
   
    // Tambahkan layout ke aplikasi
    app.AddLayout(layMain);
    layMain.AddChild(lay )







    iconSenKiri =app.AddText( layMain," [fa-arrow-circle-o-left]",-1,-1,"fontAwesome" )
    iconSenKiri.SetTextColor( "white" );
    iconSenKiri.SetTextSize( 60);
    iconSenKiri.SetPosition( .05,.01 )

    iconSenKanan=app.AddText( layMain," [fa-arrow-circle-o-right]",-1,-1,"fontAwesome" )
    iconSenKanan.SetTextColor( "white" );
    iconSenKanan.SetTextSize( 60);
    iconSenKanan.SetPosition( .75,.01 )
    
    
    iconSuhu=app.AddText( layMain,"[fa-thermometer-empty] ",-1,-1,"fontAwesome" )
    iconSuhu.SetTextColor( "white" );
    iconSuhu.SetTextSize( 40);
    iconSuhu.SetPosition( .75,.3 )
    

var lock = app.AddText(layMain, "[fa-lock]", -1, -1, "fontAwesome");
lock.SetTextColor("white");
lock.SetTextSize(40);
lock.SetTextColor( "red" )
lock.SetPosition(0.75, 0.5);

var unlock = app.AddText(layMain,"[fa-unlock]", -1, -1, "fontAwesome");
unlock.SetTextColor("white");
unlock.SetTextSize(40);
unlock.SetPosition(0.75, 0.5);
unlock.Hide(); // Sembunyikan ikon unlock pada awalnya



lock.SetOnTouch(function() {
    lock.Hide();
    unlock.Show();
});

unlock.SetOnTouch(function() {
    unlock.Hide();
    lock.Show();
});






    // Panggil fungsi untuk memulai tampilan angka
    tampilkanAngka();
    tex();
    sen();



var bt = app.AddButton(lay, "klik", 0.2, 0.1);
bt.SetOnTouch(bt_OnTouch);

function getRandomValue() {
    return Math.round(Math.random());
}

function bt_OnTouch() {
    nilaiSenKiri = getRandomValue();
    nilaiSenKanan = getRandomValue();
    sen();
  
    //app.ShowPopup("nilaiSenKiri: " + nilaiSenKiri + ", nilaiSenKanan: " + nilaiSenKanan);
    }

 
 
  
  function sen() {
    if (nilaiSenKiri === 1) {
        iconSenKiri.SetTextColor("yellow");
    } else {
        iconSenKiri.SetTextColor("white");
    }

    if (nilaiSenKanan === 1) {
        iconSenKanan.SetTextColor("yellow");
    } else {
        iconSenKanan.SetTextColor("white");
    }
}

}

function tampilkanAngka() {
    if (angka <= 120) {
        txt.SetText(angka.toString());
        angka++;
        setTimeout(tampilkanAngka, 10); // jeda animasi
    } else {
        // Setelah animasi selesai, baca nilai dari sensor speed
        bacaNilaiSensorSpeed();
        
    }
}





/*DUMMY SPEEED*/
function bacaNilaiSensorSpeed(azimuth,pitch,roll,time) {
    var nilaiSpeed = Math.floor(pitch+50);// atau gunakan Math.round(pitch) jika ingin pembulatan ke angka terdekat
   txt.SetText(nilaiSpeed.toString()); // Ganti teks dengan nilai sensor
    return nilaiSpeed;
}
	function tex(){
	//Create and start sensor object in Orientation mode.
	orient = app.CreateSensor( "Orientation", "slow" )
	orient.SetOnChange( bacaNilaiSensorSpeed)  
	orient.SetMinChange( 0.5 ) 
	orient.Start()
}
/*DUMMY SPEED*/