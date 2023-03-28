export default class BaseService {
    static checkAuth () {
        return localStorage.getItem('abcdef') && localStorage.getItem('abcdef').length === 10;
    }
    static getModeEdit () {
        return localStorage.getItem('abcdefr') == 'false';
    }
}