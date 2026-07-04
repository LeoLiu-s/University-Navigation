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

$uniB64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($uniItems))
$govB64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($govItems))

$output = @"
function _d(s){return JSON.parse(decodeURIComponent(escape(atob(s))));}
var universityData={items:_d('$uniB64'),sidebar:universitySidebar,filters:universityFilters};
var govData={items:_d('$govB64'),sidebar:govSidebar,filters:govFilters};
"@

Set-Content "$PSScriptRoot\js\data.built.js" -Value $output -Encoding UTF8 -NoNewline

$uniCount = ([regex]::Matches($uniItems, '\{ id:')).Count
$govCount = ([regex]::Matches($govItems, '\{ id:')).Count
Write-Host "Build done. uni: $uniCount, gov: $govCount"
