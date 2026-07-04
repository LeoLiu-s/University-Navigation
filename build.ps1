$src = Get-Content "$PSScriptRoot\js\data.js" -Raw -Encoding UTF8

function Extract-Brackets($code, $startIdx) {
    $depth = 0; $started = $false
    for ($i = $startIdx; $i -lt $code.Length; $i++) {
        if ($code[$i] -eq '[') { $depth++; $started = $true }
        if ($code[$i] -eq ']') { $depth-- }
        if ($started -and $depth -eq 0) { return $code.Substring($startIdx, $i - $startIdx + 1) }
    }
    throw 'Bracket mismatch'
}

$uniIdx = $src.IndexOf('items: [')
$uniItems = Extract-Brackets $src ($uniIdx + 7)

$govSection = $src.Substring($src.IndexOf('const govData'))
$govIdx = $govSection.IndexOf('items: [')
$govItems = Extract-Brackets $govSection ($govIdx + 7)

function To-Json($s) { return $s -replace '(?<=[\{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*:)', '"$1"' }

$uniItems = To-Json $uniItems
$govItems = To-Json $govItems

$uniB64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($uniItems))
$govB64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($govItems))

$output = @"
function _d(s){var b=atob(s),a=new Uint8Array(b.length);for(var i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return JSON.parse(new TextDecoder("utf-8").decode(a));}
var universityData={items:_d('$uniB64'),sidebar:universitySidebar,filters:universityFilters};
var govData={items:_d('$govB64'),sidebar:govSidebar,filters:govFilters};
"@

[System.IO.File]::WriteAllText("$PSScriptRoot\js\data.built.js", $output, [System.Text.UTF8Encoding]::new($false))

$uniCount = ([regex]::Matches($uniItems, '"id":')).Count
$govCount = ([regex]::Matches($govItems, '"id":')).Count
Write-Host "Build done. uni: $uniCount, gov: $govCount"
