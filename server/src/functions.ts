
// Source : https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export function randomstring(length:number):string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function randomInt(min: number, max: number, odd: boolean = false, even: boolean = false): number{
    let result = Math.floor((Math.random() * (max + 1 - min)) + min)

    if (odd) {

        while (result % 2 != 0) {
            result = Math.floor((Math.random() * (max+1-min)) + min)
        }

    } else if (even) {
        
        while (result % 2 == 0) {
            result = Math.floor((Math.random() * (max+1-min)) + min)
        }

    }

    return result
}

export function generateSqlDate(year: number, month: number, day: number): string {
    return `STR_TO_DATE('${year}-${month}-${day}', '%Y-%m-%d')`
}