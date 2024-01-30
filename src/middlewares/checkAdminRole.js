function checkAdminRole(req,res,next) {
    if(req.session.userLogged.roles_id === 1){
        next();
    } else {
        const errorMessage = 'Acceso no autorizado. Se requieren permisos de administrador.';
    res.status(403).send(errorMessage);
      //res.status(403).json({ error: 'Acceso denegado', message: 'Se requieren permisos de administrador para acceder a esta funcionalidad.' });
    }
}
module.exports = checkAdminRole;

