$f = 'C:\Users\大壮\Desktop\test\new\js\data.built.js'
$c = Get-Content $f -Raw -Encoding UTF8
# Check for single quotes inside base64 strings
$matches = [regex]::Matches($c, "'[^']*'")
Write-Host "Single-quoted strings found:" $matches.Count
foreach ($m in $matches) {
    $val = $m.Value
    if ($val.Length -gt 20) {
        Write-Host "  Long string (len=$($val.Length)): $($val.Substring(0,30))..."
    }
}
# Check file length
Write-Host "File size:" $c.Length "chars"
Write-Host "Lines:" ($c -split "`n").Count
