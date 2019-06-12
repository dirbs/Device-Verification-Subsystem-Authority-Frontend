/* SPDX-License-Identifier: BSD-4-Clause-Clear
Copyright (c) 2018 Qualcomm Technologies, Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the disclaimer below) provided that the following conditions are met:
·         Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
·         Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
·         All advertising materials mentioning features or use of this software, or any deployment of this software, or documentation accompanying any distribution of this software, must display the trademark/logo as per the details provided here: https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
·         Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 

SPDX-License-Identifier: ZLIB-ACKNOWLEDGEMENT
Copyright (c) 2018 Qualcomm Technologies, Inc.
This software is provided 'as-is', without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.
Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
·         The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment is required by displaying the trademark/logo as per the details provided here: https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
·         Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
·         This notice may not be removed or altered from any source distribution.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

import axios from 'axios';
import {BASE_URL} from './constants';
import Base64 from 'base-64';
import settings from '../settings.json';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import i18n from '../i18n'
import React from "react";

const MySwal = withReactContent(Swal);
const {appName} = settings.appDetails;

export const instance = axios.create({
  baseURL: BASE_URL, // Dev API
});

/**
 * this function get all groups of currently loggedIn user
 *
 * @param resources
 * @returns {string}
 */
export function getUserGroups(resources) {
  let groups = '';
  let groupDetails = (((resources || {}).realm_access || {}).roles || []);
  // Remove default group first
  let index = groupDetails.indexOf('uma_authorization');
  if (index !== -1)
    groupDetails.splice(index, 1);
  if (groupDetails.length > 0) {
    groups = groupDetails;
  }
  return groups;
}

/**
 * This functions get users' groups assigned by Keycloak and see if user has access to this application
 *
 * @param groups
 * @returns {boolean}
 */
export function isPage401(groups) {
  let pageStatus = false; // assume it's not page401
  pageStatus = (groups.length > 0) ? false : true; // if groups exist then that's not page401
  if (!pageStatus) { // if groups exist then we apply another check
    pageStatus = groups.find(app => app.split('_')[0] === appName) ? false : true; // app name is same as role assigned
  }
  return pageStatus;
}

export function getUserInfo() {
  return JSON.parse(Base64.decode(localStorage.getItem('userInfo')))
}

/**
 * This function return an header for http request with Keycloak token
 *
 * @returns {{Authorization: string, "Content-Type": string}}
 */
export function getAuthHeader(token) {
  let accessToken = localStorage.getItem('token');
  if (token) {
    accessToken = token;
  }
  return {
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json'
  }
}

function getTime() {
  return new Date().toLocaleString()
}

export function getSetTrackingId(response, term) {
  let tracking_ids = JSON.parse(localStorage.getItem('tracking_ids'))
  let countLS = JSON.parse(localStorage.getItem('count'))

  if (tracking_ids === null) {
    const tracking_ids = [];
    tracking_ids.push({
      id: response.data.task_id,
      created_at: getTime(),
      term: term
    })
    localStorage.setItem("tracking_ids", JSON.stringify(tracking_ids));
  } else {
    tracking_ids.push({
      id: response.data.task_id,
      created_at: getTime(),
      term: term
    })
    localStorage.setItem("tracking_ids", JSON.stringify(tracking_ids));
  }
  if (countLS == null) {
    let count = 0;
    count++;
    localStorage.setItem("count", JSON.stringify(count));
  } else {
    countLS++;
    localStorage.setItem("count", JSON.stringify(countLS));
  }
}

function removeElement(array, element) {
  return array.filter(e => e.id !== element);
}

export function deleteTrackingId(id) {
  let countLS = JSON.parse(localStorage.getItem('count'))
  countLS--;
  localStorage.setItem("count", JSON.stringify(countLS));
  let tracking_ids = JSON.parse(localStorage.getItem('tracking_ids'))
  localStorage.setItem("tracking_ids", JSON.stringify(removeElement(tracking_ids, id)))
}

export function getExtension(param) {
  return param.slice((Math.max(0, param.lastIndexOf(".")) || Infinity) + 1)
}

export function SweetAlert(params){
  let title = params.title
  let message = params.message
  let type = params.type

  MySwal.fire({
    title: <p>{title}</p>,
    text: message,
    type: type,
    confirmButtonText: i18n.t('button.ok')
  })
}
/**
 * Generic Errors handling for Axios
 *
 * @param context
 * @param error
 */
export function errors (context, error) {
  if (typeof error !== 'undefined') {
    if (typeof error.response === 'undefined') {
      SweetAlert({
        title: i18n.t('error'),
        message: i18n.t('serverNotResponding'),
        type: 'error'
      })
      //toast.error('API Server is not responding or You are having some network issues');
    } else {
      if (error.response.status === 400) {
        SweetAlert({
          title: i18n.t('error'),
          message: error.response.data.message,
          type: 'error'
        })
        //toast.error(error.response.data.message);
      } else if (error.response.status === 401) {
        SweetAlert({
          title: i18n.t('error'),
          message: i18n.t('sessionExpired'),
          type: 'error'
        })
        //toast.error('Your session has been expired, please wait');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else if (error.response.status === 403) {
        SweetAlert({
          title: i18n.t('error'),
          message: i18n.t('credentialMatch'),
          type: 'error'
        })
        //toast.error('These credential do not match our records.');
      } else if (error.response.status === 404) {
        SweetAlert({
          title: i18n.t('error'),
          message: error.response.data.message,
          type: 'error'
        })
        //toast.error(error.response.data.message);
      } else if (error.response.status === 405) {
        SweetAlert({
          title: i18n.t('error'),
          message: i18n.t('wrongHttp'),
          type: 'error'
        })
        //toast.error('You have used a wrong HTTP verb');
      } else if (error.response.status === 406) {
        SweetAlert({
          title: i18n.t('error'),
          message: error.response.data.message,
          type: 'error'
        })
        //toast.error(error.response.data.message);
      } else if (error.response.status === 409) {
        SweetAlert({
          title: i18n.t('error'),
          message: error.response.data.message,
          type: 'error'
        })
        //toast.error(error.response.data.message, { autoClose: 10000 });
      } else if (error.response.status === 422) {
        SweetAlert({
          title: i18n.t('error'),
          message: i18n.t('unprocessibleEntity'),
          type: 'error'
        });
        let errors = error.response.data.messages;
        for (var key in errors) {
          var caseErrors = errors[key];
          for (var i in caseErrors) {
            caseErrors = i
          }
        }
      } else if (error.response.status >= 500) {
        SweetAlert({
          title: i18n.t('error'),
          message: i18n.t('serverNotResponding'),
          type: 'error'
        })
        //toast.error("API Server is not responding or You are having some network issues", { autoClose: 8000 });
      }
    }
  }
}