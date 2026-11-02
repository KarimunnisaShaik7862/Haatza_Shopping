Add-Type -AssemblyName System.Drawing
$path = "C:\Users\srira\.gemini\antigravity-ide\brain\b4a52075-c5e4-4633-b248-e017379e6517\.user_uploaded\media_1793011877762.png"
$bmp = [System.Drawing.Bitmap]::FromFile($path)
Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"
for ($y = 0; $y -lt $bmp.Height; $y += 3) {
    $c = $bmp.GetPixel(100, $y)
    Write-Host "Y=$y : R=$($c.R) G=$($c.G) B=$($c.B)"
}
$bmp.Dispose()
