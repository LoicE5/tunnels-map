export function redirect(url: string, replace:boolean=false): void{
    if(replace) window.location.replace(url)
    else window.location.href = url
}

export function reload():void {
    window.location.reload()
}