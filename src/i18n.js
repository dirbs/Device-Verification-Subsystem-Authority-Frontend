/* SPDX-License-Identifier: BSD-4-Clause-Clear
Copyright (c) 2018-2019 Qualcomm Technologies, Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted (subject to the limitations in the disclaimer
below) provided that the following conditions are met:

  - Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  notice, this list of conditions and the following disclaimer in the
  documentation and/or other materials provided with the distribution.
  - All advertising materials mentioning features or use of this software,
  or any deployment of this software, or documentation accompanying any
  distribution of this software, must display the trademark/logo as per the
  details provided here:
  https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
  - Neither the name of Qualcomm Technologies, Inc. nor the names of its
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.


SPDX-License-Identifier: ZLIB-ACKNOWLEDGEMENT
Copyright (c) 2018-2019 Qualcomm Technologies, Inc.
This software is provided 'as-is', without any express or implied warranty.
In no event will the authors be held liable for any damages arising from
the use of this software.
Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

  - The origin of this software must not be misrepresented; you must not
  claim that you wrote the original software. If you use this software in a
  product, an acknowledgment is required by displaying the trademark/logo as
  per the details provided here:
  https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
  - Altered source versions must be plainly marked as such, and must not
  be misrepresented as being the original software.
  - This notice may not be removed or altered from any source distribution.

NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY
THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT
NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER
OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import settings from './settings';

const { defaultLanguage } = settings.appDetails;

i18n
    .use(LanguageDetector)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {
                    // App Name
                    "deviceVerificationSystem": "Device Verification System",

                    //Greetings
                    "greetings": "Hi",

                    // Navigation
                    "headerText": "Main Navigation",
                    "homeLink"  : "Home",
                    "dashboardLink": "Dashboard",
                    "VerifyImei": "Verify IMEI",
                    "Bulkverify": "Bulk IMEI",
                    "CheckStatus": "Check Status",
                    "info":"Info",
                    "status.pending":"Pending",
                    "status.notFound":"Not Found",
                    //Header
                    "verifyImei.header": "Verify IMEI",

                    //Verify IMEI Component
                    "checkStatus.header": "Check IMEI Status",
                    "checkStatus.label": "Enter the IMEI",
                    "checkStatus.createdAt": "Created at",
                    "checkStatus.term": "Verification Method",
                    "checkStatus.placeholder": "Enter 14 to 16 digits IMEI",
                    "deviceStatusTable.title": "Device Status",
                    "deviceStatusTable.brand": "Brand",
                    "deviceStatusTable.modelName": "Model Name",
                    "deviceStatusTable.modelNumber": "Model Number",
                    "deviceStatusTable.manufacturer": "Manufacturer",
                    "deviceStatusTable.type": "Device Type",
                    "deviceStatusTable.os": "Operating System",
                    "deviceStatusTable.tech": "Radio Access Technology",
                    "deviceStatusTable.informationalCondition": "IMEIs per informational condition",
                    "deviceStatusTable.state": "Per-condition Classification State",
                    "deviceStatusTable.state.gsmaNotFound": "GSMA not found",
                    "deviceStatusTable.state.malformed": "Malformed",
                    "deviceStatusTable.state.duplicateLarge": "Duplicate Large",
                    "deviceStatusTable.state.duplicate": "Duplicate",
                    "deviceStatusTable.state.localStolen": "Local Stolen",
                    "deviceStatusTable.regStatus": "Registration Status",
                    "deviceStatusTable.lostStolenStatus": "Lost/Stolen Status",
                    "deviceStatusTable.msisdn": "Associated MSISDN(s)",
                    "deviceStatusTable.imsi": "Paired IMSI(s)",
                    "deviceStatusTable.complianceStatus": "IMEI Compliance Status",
                    "deviceStatusTable.reason": "Reason for non-Compliance",
                    "deviceStatusTable.link": "Link to Mitigation Help Content",
                    "deviceStatusTable.date": "Block as of Date",
                    "seenWith.title": "Subscribers seen with IMEI",
                    "pairs.title": "Paired subscribers",
                    "pairs.lastseen": "Last seen",

                    //IMIE Status
                    "heading.normalizedIMie" :"Normalized IMEI",
                    "heading.status": "IMEI Status",
                    "heading.deviceInformation": "Device Information",
                    "heading.noInfo": "No Information",
                    "heading.pairedSubs": "Paired Subscribers",
                    "heading.lastseen": "Last Seen",
                    "subHead.duplicateCompound": "duplicate_compound",
                    "subHead.notOnRegistrationList": "not_on_registration_list",
                    "subHead.gsmaNotFound": "gsma_not_found",
                    "subHead.onLocalStolenList": "on_local_stolen_list",


                    //BulkVerify
                    "bulkverify.label":"Bulk verification method",
                    "bulkverify.tab":"Tab-delimited file",
                    "bulkverify.tac":"Enter the TAC",
                    "bulkverify.selectFile":"Select tab-delimited file",
                    "bulkverify.download":"Download the report for non-compliant IMEIs.",
                    "bulkverify.table.header":"Bulk Verify IMEIs Status",
                    "bulkverify.table.totalIMEI":"Total number of IMEIs verified",
                    "bulkverify.table.invalidIMEI":"Invalid IMEIs",
                    "bulkverify.table.nonCompliant":"Non-compliant IMEIs",
                    "bulkverify.table.blockingCondition":"IMEIs per blocking condition",
                    "bulkverify.table.noCondition":"IMEIs not meeting any condition",
                    "bulkverify.table.stolen":"IMEIs pending stolen report verification",
                    "bulkverify.table.pending":"IMEIs pending registration",
                    "bulkverify.table.info":"IMEIs per informational condition",
                    "bulkverify.tabDelimitedFile":"Tab-Delimited-File",
                    "bulkverify.enterTheTac": "Enter The Tac",
                    "bulkverify.responseMessgae": "You're request is completed. Track using this id,",

                    //404 Page
                    "UnauthorizedPage": "Unauthorized Page",
                    "ContactAdministrator": "Contact Administrator",

                    //Check Status
                    "checkStatus.trackingId": "Tracking Ids",
                    "checkStatus.currentStatus": "Current Status",
                    "checkStatus.checkStatus": "Check Status",
                    "checkStatus.status.success": "SUCCESS",
                    "checkStatus.status.pending": "PENDING",
                    "checkStatus.status.notFound": "NOT FOUND",
                    "checkStatus.noResults": "No Results found",
                    //Common
                    "submit" : "Submit",
                    "button.ok": "Ok",
                    "noInformation": "No information",
                    "unprocessibleEntity" : "Unprocessible Entity",
                    "serverNotResponding" : "Server Not Responding",
                    "error" : "error",
                    "chooseFile": "Choose File",
                    "logout": "Logout",

                    //errors
                    "errors.FeildReq": " This field is required",
                    "errors.Imie": "IMEI must contain 14 to 16 characters and contains a combination of [0-9], [a-f] and [A-F]. ",
                    "errors.tacLength": "The Tac must be a 8 digits number",
                    "errors.tacType": "The tac must be a number",
                    "errors.limitExceed": "Limit Exceed",
                    "errors.limitExceeded": "Limit exceeded for number of requests",
                    "errors.invalidFormat": "Invalid Format",
                    "errors.enterValidTac": "Enter Valid Tac",


                    //Copyright
                    "copyright": "Copyright",
                    "allRightsReserved": "All Rights Reserved",
                    "Version": "Version",
                    "requestPresent":"You are request is already in process can not process a new request"
                }
            },
            es: {
                translations: {
                    // App Name
                    "deviceVerificationSystem": "Subsistema De Verificación De Dispositivos",

                    //Greetings
                    "greetings": "Hola",

                    "welcomeApp": "Bienvenido a LSMS",

                    // Navigation
                    "headerText": "Navegación Principal",
                    "homeLink"  : "Casa",
                    "dashboardLink": "Tablero",
                    "VerifyImei": "Verificar IMEI",
                    "Bulkverify": "Abultar IMEI",
                    "CheckStatus": "Periksa Status",
                    "info":"Info",
                    "status.pending":"Pendiente",
                    "status.notFound":"Extraviado",

                    //Header
                    "verifyImei.header": "Verificar IMEI",

                    //IMIE Status
                    "heading.normalizedIMie" :"IMEI normalizado",
                    "heading.status": "Estado IMEI",
                    "heading.deviceInformation": "Información del dispositivo",
                    "heading.noInfo": "Sin información",
                    "heading.pairedSubs": "Suscriptores Pareados",
                    "heading.lastseen": "Ultima vez visto",
                    "subHead.duplicateCompound": "compuesto_duplicado",
                    "subHead.notOnRegistrationList": "no-en-la-lista-de-registro",
                    "subHead.gsmaNotFound": "gsma-no-encontrado",
                    "subHead.onLocalStolenList": "en-lista-local-robada",

                    //Verify IMEI Component
                    "checkStatus.header": "Verifique el estado de IMEI",
                    "checkStatus.label": "Ingrese el IMEI",
                    "checkStatus.term": "Método de verificación",
                    "checkStatus.createdAt": "Creado en",
                    "checkStatus.placeholder": "Ingrese 14 dígitos IMEI",
                    "deviceStatusTable.title": "Estado del dispositivo",
                    "deviceStatusTable.brand": "Marca",
                    "deviceStatusTable.modelName": "Nombre del modelo",
                    "deviceStatusTable.modelNumber": "Número de modelo",
                    "deviceStatusTable.manufacturer": "Fabricante",
                    "deviceStatusTable.type": "Tipo de dispositivo",
                    "deviceStatusTable.os": "Sistema operativo",
                    "deviceStatusTable.tech": "Tecnología de acceso de radio",
                    "deviceStatusTable.state": "Estado de clasificación previa",
                    "deviceStatusTable.state.gsmaNotFound": "GSMA extraviado",
                    "deviceStatusTable.state.malformed": "Malformado",
                    "deviceStatusTable.state.duplicateLarge": "Duplicar grande",
                    "deviceStatusTable.state.duplicate": "Duplicar",
                    "deviceStatusTable.state.localStolen": "Robo local",
                    "deviceStatusTable.regStatus": "Estado de registro",
                    "deviceStatusTable.lostStolenStatus": "Estado perdido / robado",
                    "deviceStatusTable.msisdn": "Asociado MSISDN(s)",
                    "deviceStatusTable.imsi": "Emparejado IMSI(s)",
                    "deviceStatusTable.complianceStatus": "Estado de cumplimiento IMEI",
                    "deviceStatusTable.reason": "Motivo de incumplimiento",
                    "deviceStatusTable.link": "Enlace al contenido de ayuda de mitigación",
                    "deviceStatusTable.date": "Bloquear a partir de la fecha",
                    "seenWith.title": "Visto con",
                    "submit" : "Enviar",
                    "button.ok": "De acuerdo",
                    "unprocessibleEntity" : "Entidad no procesable",
                    "serverNotResponding" : "Servidor no responde",
                    "error" : "error",

                    //BulkVerify
                    "bulkverify.label":"Método de verificación a granel",
                    "bulkverify.tab":"Archivo delimitado por tabuladores",
                    "bulkverify.tac":"Introducir el TAC",
                    "bulkverify.selectFile":"Seleccionar archivo delimitado por tabuladores",
                    "bulkverify.download":"Descargue el informe para IMEI no conformes.",
                    "bulkverify.table.header":"Verificación masiva del estado de IMEI",
                    "bulkverify.table.totalIMEI":"Número total de IMEI verificados",
                    "bulkverify.table.invalidIMEI":"IMEI inválido",
                    "bulkverify.table.nonCompliant":"IMEIs no conformes",
                    "bulkverify.table.blockingCondition":"IMEI por condición de bloqueo",
                    "bulkverify.table.noCondition":"IMEI no cumple ninguna condición",
                    "bulkverify.table.stolen":"IMEIs pendiente de verificación de informes robados",
                    "bulkverify.table.pending":"IMEI pendiente de registro",
                    "bulkverify.table.info":"IMEI por condición informativa",
                    "bulkverify.tabDelimitedFile":"Archivo-delimitado-por-tabulaciones",
                    "bulkverify.enterTheTac": "Entrar en el tac",
                    "bulkverify.responseMessgae": "Su solicitud se ha completado. Seguimiento usando esta identificación,",

                    //commons
                    "chooseFile": "Elija el archivo",
                    "logout": "Cerrar sesión",

                    //Check Status
                    "checkStatus.trackingId": "Seguimiento de Ids",
                    "checkStatus.currentStatus": "Estado actual",
                    "checkStatus.checkStatus": "Comprobar estado",
                    "checkStatus.status.success": "ÉXITO",
                    "checkStatus.status.pending": "PENDIENTE",
                    "checkStatus.status.notFound": "EXTRAVIADO",
                    "checkStatus.noResults": "No se han encontrado resultados",

                    //errors
                    "errors.FeildReq": "Esta seccion es necesaria",
                    "errors.Imie": "IMEI debe contener de 14 a 16 caracteres y contiene una combinación de [0-9], [a-f] y [A-F].",
                    "errors.tacLength": "El Tac debe ser un número de 8 dígitos",
                    "errors.tacType": "El tac debe ser un número.",
                    "errors.limitExceed": "Límite excedido",
                    "errors.limitExceeded": "Límite excedido para el número de solicitudes",
                    "errors.invalidFormat": "Formato inválido",
                    "errors.enterValidTac": "Ingrese val",

                    //Copyright
                    "copyright": "Derechos",
                    "allRightsReserved": "Todos Los Derechos Reservados",
                    "Version": "Versión",
                    "requestPresent":"Eres petición ya está en proceso no puede procesar una nueva solicitu"
                }
            },
            id: {
                translations: {
                    // App Name
                    "deviceVerificationSystem": "Subsistem Verifikasi Perangkat",

                    //Greetings
                    "greetings": "Hai",

                    "welcomeApp": "Selamat datang di LSMS",

                    // Navigation
                    "headerText": "Navigasi Utama",
                    "homeLink"  : "Rumah",
                    "dashboardLink": "Dasbor",
                    "VerifyImei": "Memeriksa IMEI",
                    "Bulkverify": "Jumlah besar IMEI",
                    "CheckStatus": "Periksa Status",
                    "info":"Info",
                    "status.pending":"Tertunda",
                    "status.notFound":"Tidak Ditemukan",

                    //Header
                    "verifyImei.header": "Memeriksa IMEI",

                    //IMIE Status
                    "heading.normalizedIMie" :"IMEI Yang Dinormalisasi",
                    "heading.status": "Status IMEI",
                    "heading.deviceInformation": "Informasi Perangkat",
                    "heading.noInfo": "Tidak ada Informasi",
                    "heading.pairedSubs": "Pelanggan Berpasangan",
                    "heading.lastseen": "Terakhir terlihat",
                    "subHead.duplicateCompound": "duplikat_senyawa",
                    "subHead.notOnRegistrationList": "tidak_ada_dalam_daftar_pendaftaran",
                    "subHead.gsmaNotFound": "gsma_tidak_ditemukan",
                    "subHead.onLocalStolenList": "pada_daftar_curian_lokal",

                    //Verify IMEI Component
                    "checkStatus.header": "Periksa Status IMEI",
                    "checkStatus.label": "Masukkan IMEI",
                    "checkStatus.placeholder": "Masukkan 14 digit IMEI",
                    "deviceStatusTable.title": "Status Perangkat",
                    "deviceStatusTable.brand": "Merek",
                    "deviceStatusTable.modelName": "Nama model",
                    "deviceStatusTable.modelNumber": "Nomor model",
                    "deviceStatusTable.manufacturer": "Pabrikan",
                    "deviceStatusTable.type": "Tipe perangkat",
                    "deviceStatusTable.os": "Sistem operasi",
                    "deviceStatusTable.tech": "Teknologi Akses Radio",
                    "deviceStatusTable.state": "Negara Klasifikasi Pra-kondisi",
                    "deviceStatusTable.state.gsmaNotFound": "GSMA tidak ditemukan",
                    "deviceStatusTable.state.malformed": "Berformat buruk",
                    "deviceStatusTable.state.duplicateLarge": "Duplikat Besar",
                    "deviceStatusTable.state.duplicate": "Duplikat",
                    "deviceStatusTable.state.localStolen": "Dicuri lokal",
                    "deviceStatusTable.regStatus": "Status Pendaftaran",
                    "deviceStatusTable.lostStolenStatus": "Status Hilang / Dicuri",
                    "deviceStatusTable.msisdn": "Associated MSISDN(s)",
                    "deviceStatusTable.imsi": "Dipasangkan IMSI(s)",
                    "deviceStatusTable.complianceStatus": "Status Kepatuhan IMEI",
                    "deviceStatusTable.reason": "Alasan ketidaksesuaian",
                    "deviceStatusTable.link": "Tautan ke Konten Bantuan Mitigasi",
                    "deviceStatusTable.date": "Blokir Tanggal",
                    "seenWith.title": "Terlihat dengan",
                    "submit" : "Menyerahkan",
                    "button.ok": "Baik",
                    "unprocessibleEntity" : "Entitas yang tidak dapat diproses",
                    "serverNotResponding" : "Server tidak merespons",
                    "error" : "kesalahan",
                    //BulkVerify
                    "bulkverify.label":"Metode verifikasi massal",
                    "bulkverify.tab":"File yang dibatasi tab",
                    "bulkverify.tac":"Masukkan TAC",
                    "bulkverify.selectFile":"Pilih file yang dibatasi tab",
                    "bulkverify.download":"Unduh laporan untuk IMEI yang tidak sesuai",
                    "bulkverify.table.header":"Massal Verifikasi Status IMEIs",
                    "bulkverify.table.totalIMEI":"Jumlah total IMEI yang diverifikasi",
                    "bulkverify.table.invalidIMEI":"IMEI tidak valid",
                    "bulkverify.table.nonCompliant":"IMEI yang tidak sesuai",
                    "bulkverify.table.blockingCondition":"IMEI per kondisi pemblokiran",
                    "bulkverify.table.noCondition":"IMEI tidak memenuhi ketentuan apa pun",
                    "bulkverify.table.stolen":"IMEI menunggu verifikasi laporan yang dicuri",
                    "bulkverify.table.pending":"IMEI menunggu pendaftaran",
                    "bulkverify.table.info":"IMEI per kondisi informasi",
                    "bulkverify.tabDelimitedFile":"File-yang-Dibatasi-Tab",
                    "bulkverify.enterTheTac": "Masukkan Tac",
                    "bulkverify.responseMessgae": "Permintaan Anda selesai. Lacak menggunakan id ini,",

                    //Check Status
                    "checkStatus.trackingId": "Id Pelacakan",
                    "checkStatus.currentStatus": "Status terkini",
                    "checkStatus.checkStatus": "Periksa Status",
                    "checkStatus.status.success": "KEBERHASILAN",
                    "checkStatus.status.pending": "TERTUNDA",
                    "checkStatus.status.notFound": "TIDAK DITEMUKAN",
                    "checkStatus.noResults": "Tidak ada hasil yang ditemukan",
                    "checkStatus.createdAt": "Dibuat di",
                    "checkStatus.term": "Metode Verifikasi",

                    //commons
                    "chooseFile": "Pilih File",
                    "logout": "Keluar",

                    //errors
                    "errors.FeildReq": "Bagian ini diperlukan",
                    "errors.Imie": "IMEI harus mengandung 14 hingga 16 karakter dan mengandung kombinasi [0-9], [a-f] dan [A-F].",
                    "errors.tacLength": "Tac harus berupa angka 8 digit",
                    "errors.tacType": "Tac harus berupa angka",
                    "errors.limitExceed": "Batasi Melebihi",
                    "errors.limitExceeded": "Batas terlampaui untuk jumlah permintaan",
                    "errors.invalidFormat": "Format yang tidak valid",
                    "errors.enterValidTac": "Masukkan tac yang valid",


                    //Copyright
                    "copyright": "Hak Cipta",
                    "allRightsReserved": "Seluruh Hak Cipta",
                    "Version": "Versi",
                    "requestPresent":"Permintaan Anda sudah dalam proses tidak dapat memproses permintaan baru"


                }
            }
        },
        fallbackLng: 'en',
        debug: false,

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: false, // we use content as keys


        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ','
        },

        react: {
            wait: true
        }
    });
i18n.changeLanguage(defaultLanguage);
export default i18n;