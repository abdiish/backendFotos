import jwt from 'jsonwebtoken';

export default class Token {

    private static seed     : string = 'p&uuUmcuKpel*S**tf*$5hlYEea31EBSy0ji9sCHyTh9J^y2GF';
    private static caducidad: string = '30d';
    
    constructor() {}

    static getJWT(payload: any):string {

        return jwt.sign({
            usuario: payload
        }, this.seed, {expiresIn: this.caducidad});
    }

    static comprobarToken(userToken: string) {

        return new Promise((resolve, reject) => {

            jwt.verify(userToken, this.seed, (err: any, decoded: any) => {
                
                if (err) {
                    reject();    
                    
                }else{
                    resolve(decoded);
                }
            });
        });
}

}