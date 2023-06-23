const sequelize = require('../database/config');
const Perfil = require('../models/perfil');
const nanoid = require('nanoid');
const Permiso = require('../models/permiso');
const PerfilPermiso = require('../models/perfilPermiso');
const DestinoNotificacion = require('../models/destinoNotificacion');
const TipoNotificacion = require('../models/tipoNotificacion');
const ConfiguracionNotificacion = require('../models/configuracionNotificacion');
const TipoActividad = require('../models/tipoActividad');
const ImportanciaObservacion = require('../models/importanciaObservacion');
const ActividadEstado = require('../models/actividadEstado');
const { Op } = require("sequelize");
const moment = require('moment')


/*Al iniciar la base datos(creación), se crea por defecto un perfil ADMIN, que si ya existe dicho perfil esta 
        acción no se realiza*/

const dbInit = sequelize.sync({ force: false }).then(async () => {

    // se crean los estados por los que puede pasar una actividad
    const existeActividadEstado = await ActividadEstado.findOne({ where: { actividadEstadoId: '1111' } })
    if (existeActividadEstado) {
        console.log('El estado "En progreso" de ActividadEstado ya existe')
    }
    else {
        const actividadEstado = new ActividadEstado({
            actividadEstadoId: "1111",
            NombreActividadEstado: "En Progreso"
        })
        await actividadEstado.save()
    }

    const existeActividadEstado1 = await ActividadEstado.findOne({ where: { actividadEstadoId: '2222' } })
    if (existeActividadEstado1) {
        console.log('El estado "Completada" de ActividadEstado ya existe')
    }
    else {
        const actividadEstado = new ActividadEstado({
            actividadEstadoId: "2222",
            NombreActividadEstado: "Completada"
        })
        await actividadEstado.save()
    }

    const existeActividadEstado3 = await ActividadEstado.findOne({ where: { actividadEstadoId: '3333' } })
    if (existeActividadEstado3) {
        console.log('El estado "Planificada" de ActividadEstado ya existe')
    }
    else {
        const actividadEstado = new ActividadEstado({
            actividadEstadoId: "3333",
            NombreActividadEstado: "Planificada"
        })
        await actividadEstado.save()
    }

    const existeActividadEstado4 = await ActividadEstado.findOne({ where: { actividadEstadoId: '4444' } })
    if (existeActividadEstado4) {
        console.log('El estado "Demorada" de ActividadEstado ya existe')
    }
    else {
        const actividadEstado = new ActividadEstado({
            actividadEstadoId: "4444",
            NombreActividadEstado: "Demorada"
        })
        await actividadEstado.save()
    }

    const existeActividadEstado5 = await ActividadEstado.findOne({ where: { actividadEstadoId: '5555' } })
    if (existeActividadEstado5) {
        console.log('El estado "Planificada Completada" de ActividadEstado ya existe')
    }
    else {
        const actividadEstado = new ActividadEstado({
            actividadEstadoId: "5555",
            NombreActividadEstado: "Planificada Completada"
        })
        await actividadEstado.save()
    }

    const existeTipoActividad = await TipoActividad.findOne({ where: { tipoActividadId: '1111' } })
    if (existeTipoActividad) {
        console.log('el tipo de actividad siembra ya existe')
    }
    else {
        const tipoActividad = new TipoActividad({
            tipoActividadId: "1111",
            CodigoTipoActividad: "1",
            FechaBajaTipoActividad: null,
            NombreTipoActividad: "Siembra"
        })
        await tipoActividad.save()
    }

    let PerfilId;
    const existePerfil = await Perfil.findOne({ where: { NombrePerfil: 'ADMIN' } });
    if (existePerfil) {
        console.log(`El perfil ADMIN ya existe`)
    } else {
        const newPerfil = new Perfil({
            "perfilId": nanoid.nanoid(),
            "NombrePerfil": "ADMIN",
            "CodigoPerfil": "1"
        })
        await newPerfil.save()
        console.log(newPerfil)
        const newRol = new Perfil({
            "perfilId": nanoid.nanoid(),
            "NombrePerfil": "CLIENTE",
            "CodigoPerfil": "2"
        })
        await newRol.save()

        PerfilId = newPerfil.perfilId;

        const newRol1 = new Perfil({
            "perfilId": nanoid.nanoid(),
            "NombrePerfil": "INGENIERO",
            "CodigoPerfil": "2"
        })
        await newRol1.save()

        const newRol2 = new Perfil({
            "perfilId": nanoid.nanoid(),
            "NombrePerfil": "PILOTO",
            "CodigoPerfil": "2"
        })
        await newRol2.save()
    }

    //Se crea permiso 1
    let Permiso1;
    const existePermiso1 = await Permiso.findOne({ where: { NombrePermiso: 'Gestionar Campo' } });
    if (existePermiso1) {
        console.log(`El Permiso Gestionar Campo ya existe`)
    } else {
        const newPermiso = new Permiso({
            "permisoId": nanoid.nanoid(),
            "NombrePermiso": "Gestionar Campo",
            "CodigoPermiso": "1",
        })

        await newPermiso.save()
        Permiso1 = newPermiso.permisoId;

        const newPerfilPermiso1 = new PerfilPermiso({
            "perfilPermisoId": nanoid.nanoid(),
            "fk_Perfil": PerfilId,
            "fk_Permiso": Permiso1
        })
        await newPerfilPermiso1.save()
    }

    //Se crea permiso 2
    let Permiso2;
    const existePermiso2 = await Permiso.findOne({ where: { NombrePermiso: 'Gestionar Parcela' } });
    if (existePermiso2) {
        console.log(`El Permiso Gestionar Parcela ya existe`)
    } else {
        const newPermiso = new Permiso({
            "permisoId": nanoid.nanoid(),
            "NombrePermiso": "Gestionar Parcela",
            "CodigoPermiso": "2",
        })

        await newPermiso.save()
        Permiso2 = newPermiso.permisoId

        const newPerfilPermiso2 = new PerfilPermiso({
            "perfilPermisoId": nanoid.nanoid(),
            "fk_Perfil": PerfilId,
            "fk_Permiso": Permiso2
        })
        await newPerfilPermiso2.save()
    }

    //Se crea permiso 3
    let Permiso3;
    const existePermiso3 = await Permiso.findOne({ where: { NombrePermiso: 'Gestionar Actividad' } });
    if (existePermiso3) {
        console.log(`El Permiso Gestionar Actividad ya existe`)
    } else {
        const newPermiso = new Permiso({
            "permisoId": nanoid.nanoid(),
            "NombrePermiso": "Gestionar Actividad",
            "CodigoPermiso": "3",
        })

        await newPermiso.save()
        Permiso3 = newPermiso.permisoId

        const newPerfilPermiso3 = new PerfilPermiso({
            "perfilPermisoId": nanoid.nanoid(),
            "fk_Perfil": PerfilId,
            "fk_Permiso": Permiso3
        })
        await newPerfilPermiso3.save()
    }


    //Se crea permiso 4
    let Permiso4
    const existePermiso4 = await Permiso.findOne({ where: { NombrePermiso: 'Gestionar Analisis' } });
    if (existePermiso4) {
        console.log(`El Permiso Gestionar Analisis ya existe`)
    } else {
        const newPermiso = new Permiso({
            "permisoId": nanoid.nanoid(),
            "NombrePermiso": "Gestionar Analisis",
            "CodigoPermiso": "4",
        })

        await newPermiso.save()
        Permiso4 = newPermiso.permisoId

        const newPerfilPermiso4 = new PerfilPermiso({
            "perfilPermisoId": nanoid.nanoid(),
            "fk_Perfil": PerfilId,
            "fk_Permiso": Permiso4
        })
        await newPerfilPermiso4.save()
    }

    //Se crea permiso 5
    let Permiso5
    const existePermiso5 = await Permiso.findOne({ where: { NombrePermiso: 'Generar Reporte' } });
    if (existePermiso5) {
        console.log(`El Permiso Generar Reporte ya existe`)
    } else {
        const newPermiso = new Permiso({
            "permisoId": nanoid.nanoid(),
            "NombrePermiso": "Generar Reporte",
            "CodigoPermiso": "5",
        })

        await newPermiso.save()
        Permiso5 = newPermiso.permisoId

        const newPerfilPermiso5 = new PerfilPermiso({
            "perfilPermisoId": nanoid.nanoid(),
            "fk_Perfil": PerfilId,
            "fk_Permiso": Permiso5
        })
        await newPerfilPermiso5.save()
    }

    //Se crea permiso 6
    let Permiso6
    const existePermiso6 = await Permiso.findOne({ where: { NombrePermiso: 'Gestionar Observacion' } });
    if (existePermiso6) {
        console.log(`El Permiso Gestionar Observacion ya existe`)
    } else {
        const newPermiso = new Permiso({
            "permisoId": nanoid.nanoid(),
            "NombrePermiso": "Gestionar Observacion",
            "CodigoPermiso": "6",
        })

        await newPermiso.save()
        Permiso6 = newPermiso.permisoId

        const newPerfilPermiso6 = new PerfilPermiso({
            "perfilPermisoId": nanoid.nanoid(),
            "fk_Perfil": PerfilId,
            "fk_Permiso": Permiso6
        })
        await newPerfilPermiso6.save()
    }

    //Se crea permiso 7
    let Permiso7
    const existePermiso7 = await Permiso.findOne({ where: { NombrePermiso: 'Gestionar Vuelo' } });
    if (existePermiso7) {
        console.log(`El Permiso Gestionar Vuelo ya existe`)
    } else {
        const newPermiso = new Permiso({
            "permisoId": nanoid.nanoid(),
            "NombrePermiso": "Gestionar Vuelo",
            "CodigoPermiso": "7",
        })

        await newPermiso.save()
        Permiso7 = newPermiso.permisoId

        const newPerfilPermiso7 = new PerfilPermiso({
            "perfilPermisoId": nanoid.nanoid(),
            "fk_Perfil": PerfilId,
            "fk_Permiso": Permiso7
        })
        await newPerfilPermiso7.save()
    }

    //le asocio los permisos por defecto a cada perfil
    const perfiles = await Perfil.findAll({
        where: {
            NombrePerfil: {
                [Op.ne]: 'ADMIN'
            },
        }
    })
    //A cada perfil le asocio permisos por defecto
    for (i in perfiles) {
        const permiso = await Permiso.findAll()
        for (j in permiso) {
            const newPerfilPermiso = new PerfilPermiso({
                "perfilPermisoId": nanoid.nanoid(),
                "fk_Perfil": perfiles[i].perfilId,
                "fk_Permiso": permiso[j].permisoId,
                "FechaBajaPerfilPermiso": moment(new Date(), 'YYYY-MM-DD')
            })
            await newPerfilPermiso.save()
        }
    }

    const Importancia1 = await ImportanciaObservacion.findOne({ where: { GradoImportanciaObservacion: '1' } });
    if (!Importancia1) {
        const importancia1 = new ImportanciaObservacion({
            "importanciaObservacionId": nanoid.nanoid(),
            "GradoImportanciaObservacion": "1"

        })
        await importancia1.save()
    }

    const Importancia2 = await ImportanciaObservacion.findOne({ where: { GradoImportanciaObservacion: '2' } });
    if (!Importancia2) {
        const importancia2 = new ImportanciaObservacion({
            "importanciaObservacionId": nanoid.nanoid(),
            "GradoImportanciaObservacion": "2"

        })
        await importancia2.save()
    }

    const Importancia3 = await ImportanciaObservacion.findOne({ where: { GradoImportanciaObservacion: '3' } });
    if (!Importancia3) {
        const importancia3 = new ImportanciaObservacion({
            "importanciaObservacionId": nanoid.nanoid(),
            "GradoImportanciaObservacion": "3"

        })
        await importancia3.save()
    }

    const Importancia4 = await ImportanciaObservacion.findOne({ where: { GradoImportanciaObservacion: '4' } });
    if (!Importancia4) {
        const importancia4 = new ImportanciaObservacion({
            "importanciaObservacionId": nanoid.nanoid(),
            "GradoImportanciaObservacion": "4"

        })
        await importancia4.save()
    }

    const Importancia5 = await ImportanciaObservacion.findOne({ where: { GradoImportanciaObservacion: '5' } });
    if (!Importancia5) {
        const importancia5 = new ImportanciaObservacion({
            "importanciaObservacionId": nanoid.nanoid(),
            "GradoImportanciaObservacion": "5"

        })
        await importancia5.save()
    }
    //Modulo notificaciones

    //Se crean los destinoNotificacion
    //Destino mail
    let DestinoMail;
    let DestinoSitio;
    const existeDestinoNotificacionMail = await DestinoNotificacion.findOne({ where: { NombreDestinoNotificacion: 'Mail' } });
    if (existeDestinoNotificacionMail) {
        console.log(`El DestinoNotificacion ya existe`)
        DestinoMail = existeDestinoNotificacionMail;
    } else {
        const newDestinoNotificacionMail = new DestinoNotificacion({
            "destinoNotificacionId": nanoid.nanoid(),
            "CodigoDestinoNotificacion": "1",
            "NombreDestinoNotificacion": "Mail",
            "FechaBajaDestinoNotificacion": null
        })
        await newDestinoNotificacionMail.save()
        DestinoMail = newDestinoNotificacionMail;
    }

    //Destino sitio
    const existeDestinoNotificacionSitio = await DestinoNotificacion.findOne({ where: { NombreDestinoNotificacion: 'Sitio' } });
    if (existeDestinoNotificacionSitio) {
        console.log(`El DestinoNotificacion ya existe`)
        DestinoSitio = existeDestinoNotificacionMail;
    } else {
        const newDestinoNotificacionSitio = new DestinoNotificacion({
            "destinoNotificacionId": nanoid.nanoid(),
            "CodigoDestinoNotificacion": "2",
            "NombreDestinoNotificacion": "Sitio",
            "FechaBajaDestinoNotificacion": null
        })
        await newDestinoNotificacionSitio.save()
        DestinoSitio = newDestinoNotificacionSitio;
    }

    //Se crean los tipoNotificacion con las configuracionNotificacion
    //Parcela Creada
    const existeTipoNotificacionPC = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Parcela Creada' } });
    if (existeTipoNotificacionPC) {
        console.log(`La Parcela Creada ya existe`)
    } else {
        const newTipoNotificacionPC = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "1",
            "NombreTipoNotificacion": "Parcela Creada",
            "MensajeModeloTipoNotificacion": "Se ha creado una nueva Parcela: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionPC.save()

        const newConfiguracionNotificacionPCM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionPC.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionPCM.save()

        const newConfiguracionNotificacionPCS = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionPC.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionPCS.save()
    }

    //Parcela Modificada
    const existeTipoNotificacionPM = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Parcela Modificada' } });
    if (existeTipoNotificacionPM) {
        console.log(`La Parcela Modificada ya existe`)
    } else {
        const newTipoNotificacionPM = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "2",
            "NombreTipoNotificacion": "Parcela Modificada",
            "MensajeModeloTipoNotificacion": "Se ha modificado una Parcela: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionPM.save()

        const newConfiguracionNotificacionPMM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionPM.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionPMM.save()

        const newConfiguracionNotificacionPMS = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionPM.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionPMS.save()
    }

    //Parcela Eliminada
    const existeTipoNotificacionPE = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Parcela Eliminada' } });
    if (existeTipoNotificacionPE) {
        console.log(`La Parcela Eliminada ya existe`)
    } else {
        const newTipoNotificacionPE = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "3",
            "NombreTipoNotificacion": "Parcela Eliminada",
            "MensajeModeloTipoNotificacion": "Se ha eliminado una Parcela: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionPE.save()

        const newConfiguracionNotificacionPEM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionPE.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionPEM.save()

        const newConfiguracionNotificacionPES = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionPE.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionPES.save()
    }

    //Observacion Creada
    const existeTipoNotificacionOC = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Observacion Creada' } });
    if (existeTipoNotificacionOC) {
        console.log(`La Observacion Creada ya existe`)
    } else {
        const newTipoNotificacionOC = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "4",
            "NombreTipoNotificacion": "Observacion Creada",
            "MensajeModeloTipoNotificacion": "Se ha creado una nueva Observacion: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionOC.save()

        const newConfiguracionNotificacionOCM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionOC.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionOCM.save()

        const newConfiguracionNotificacionOCS = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionOC.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionOCS.save()
    }

    //Observacion Modificada
    const existeTipoNotificacionOM = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Observacion Modificada' } });
    if (existeTipoNotificacionOM) {
        console.log(`La Observacion Modificada ya existe`)
    } else {
        const newTipoNotificacionOM = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "5",
            "NombreTipoNotificacion": "Observacion Modificada",
            "MensajeModeloTipoNotificacion": "Se ha modificado una Observacion: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionOM.save()

        const newConfiguracionNotificacionOMM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionOM.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionOMM.save()

        const newConfiguracionNotificacionOMS = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionOM.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionOMS.save()
    }

    //Observacion Eliminada
    const existeTipoNotificacionOE = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Observacion Eliminada' } });
    if (existeTipoNotificacionOE) {
        console.log(`La Observacion Eliminada ya existe`)
    } else {
        const newTipoNotificacionOE = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "6",
            "NombreTipoNotificacion": "Observacion Eliminada",
            "MensajeModeloTipoNotificacion": "Se ha eliminado una Observacion: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionOE.save()

        const newConfiguracionNotificacionOEM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionOE.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionOEM.save()

        const newConfiguracionNotificacionOES = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionOE.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionOES.save()
    }

    //Actividad Creada
    const existeTipoNotificacionAC = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Actividad Creada' } });
    if (existeTipoNotificacionAC) {
        console.log(`La Actividad Creada ya existe`)
    } else {
        const newTipoNotificacionAC = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "7",
            "NombreTipoNotificacion": "Actividad Creada",
            "MensajeModeloTipoNotificacion": "Se ha creado una nueva Actividad: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionAC.save()

        const newConfiguracionNotificacionACM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionAC.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionACM.save()

        const newConfiguracionNotificacionACS = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionAC.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionACS.save()
    }

    //Actividad Modificada
    const existeTipoNotificacionAM = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Actividad Modificada' } });
    if (existeTipoNotificacionAM) {
        console.log(`La Actividad Modificada ya existe`)
    } else {
        const newTipoNotificacionAM = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "8",
            "NombreTipoNotificacion": "Actividad Modificada",
            "MensajeModeloTipoNotificacion": "Se ha modificado una Actividad: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionAM.save()

        const newConfiguracionNotificacionAMM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionAM.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionAMM.save()

        const newConfiguracionNotificacionAMS = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionAM.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionAMS.save()
    }

    //Actividad Eliminada
    const existeTipoNotificacionAE = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Actividad Eliminada' } });
    if (existeTipoNotificacionAE) {
        console.log(`La Actividad Eliminada ya existe`)
    } else {
        const newTipoNotificacionAE = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "9",
            "NombreTipoNotificacion": "Actividad Eliminada",
            "MensajeModeloTipoNotificacion": "Se ha eliminado una Actividad: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionAE.save()

        const newConfiguracionNotificacionAEM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionAE.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionAEM.save()

        const newConfiguracionNotificacionAES = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionAE.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionAES.save()
    }

    //Vuelo Creado
    const existeTipoNotificacionVC = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Vuelo Creado' } });
    if (existeTipoNotificacionVC) {
        console.log(`El Vuelo Creado ya existe`)
    } else {
        const newTipoNotificacionVC = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "10",
            "NombreTipoNotificacion": "Vuelo Creado",
            "MensajeModeloTipoNotificacion": "Se ha creado un nuevo Vuelo: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionVC.save()

        const newConfiguracionNotificacionVCM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionVC.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionVCM.save()

        const newConfiguracionNotificacionVCS = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionVC.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionVCS.save()
    }

    //Vuelo Modificado
    const existeTipoNotificacionVM = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Vuelo Modificado' } });
    if (existeTipoNotificacionVM) {
        console.log(`El Vuelo Modificado ya existe`)
    } else {
        const newTipoNotificacionVM = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "11",
            "NombreTipoNotificacion": "Vuelo Modificado",
            "MensajeModeloTipoNotificacion": "Se ha modificado un Vuelo: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionVM.save()

        const newConfiguracionNotificacionVMM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionVM.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionVMM.save()

        const newConfiguracionNotificacionVMS = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionVM.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionVMS.save()
    }

    //Vuelo Eliminado
    const existeTipoNotificacionVE = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Vuelo Eliminado' } });
    if (existeTipoNotificacionVE) {
        console.log(`El Vuelo Eliminado ya existe`)
    } else {
        const newTipoNotificacionVE = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "12",
            "NombreTipoNotificacion": "Vuelo Eliminado",
            "MensajeModeloTipoNotificacion": "Se ha eliminado un Vuelo: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionVE.save()

        const newConfiguracionNotificacionVEM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionVE.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionVEM.save()

        const newConfiguracionNotificacionVES = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionVE.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionVES.save()
    }

    //Campo Creado
    const existeTipoNotificacionCC = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Campo Creado' } });
    if (existeTipoNotificacionCC) {
        console.log(`El Campo Creado ya existe`)
    } else {
        const newTipoNotificacionCC = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "13",
            "NombreTipoNotificacion": "Campo Creado",
            "MensajeModeloTipoNotificacion": "Se ha creado un nuevo Campo: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionCC.save()

        const newConfiguracionNotificacionCCM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionCC.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionCCM.save()

        const newConfiguracionNotificacionCCS = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionCC.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionCCS.save()
    }

    //Campo Modificado
    const existeTipoNotificacionCM = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Campo Modificado' } });
    if (existeTipoNotificacionCM) {
        console.log(`El Campo Modificado ya existe`)
    } else {
        const newTipoNotificacionCM = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "14",
            "NombreTipoNotificacion": "Campo Modificado",
            "MensajeModeloTipoNotificacion": "Se ha modificado un Campo: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionCM.save()

        const newConfiguracionNotificacionCMM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionCM.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionCMM.save()

        const newConfiguracionNotificacionCMS = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionCM.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionCMS.save()
    }

    //Campo Eliminado
    const existeTipoNotificacionCE = await TipoNotificacion.findOne({ where: { NombreTipoNotificacion: 'Campo Eliminado' } });
    if (existeTipoNotificacionCE) {
        console.log(`El Campo Eliminado ya existe`)
    } else {
        const newTipoNotificacionCE = new TipoNotificacion({
            "tipoNotificacionId": nanoid.nanoid(),
            "CodigoTipoNotificacion": "15",
            "NombreTipoNotificacion": "Campo Eliminado",
            "MensajeModeloTipoNotificacion": "Se ha eliminado un Campo: ",
            "FechaBajaTipoNotificacion": null
        })
        await newTipoNotificacionCE.save()

        const newConfiguracionNotificacionCEM = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionCE.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoMail.destinoNotificacionId
        })
        await newConfiguracionNotificacionCEM.save()

        const newConfiguracionNotificacionCES = new ConfiguracionNotificacion({
            "configuracionNotificacionId": nanoid.nanoid(),
            "fechaBajaConfiguracionNotificacion": null,
            "fk_TipoNotificacion": newTipoNotificacionCE.tipoNotificacionId,
            "fk_DestinoNotificacion": DestinoSitio.destinoNotificacionId
        })
        await newConfiguracionNotificacionCES.save()
    }


    console.log("Nos hemos conectado a la base de datos");

}).catch(error => {
    console.log('Se ha producido un error', error);
})

module.exports = dbInit;

