/*
Copyright (c) 2018-2019 Qualcomm Technologies, Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the 
disclaimer below) provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer 
      in the documentation and/or other materials provided with the distribution.
    * Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote 
      products derived from this software without specific prior written permission.
    * The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use 
      this software in a product, an acknowledgment is required by displaying the trademark/log as per the details provided 
      here: https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
    * Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
    * This notice may not be removed or altered from any source distribution.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED 
BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT 
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO 
EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS 
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

export default {
  items: [
    {
      title: true,
      name: 'Main Navigation',
      wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      id: 1,
      name: 'VerifyImei',
      url: '/verifyImei',
      icon: 'fa fa-braille',
      // badge: {
      //   variant: 'info',
      //   text: 'NEW'
      // }
    },
    {
        id: 2,
        name: 'Bulkverify',
        url: '/bulk-verify',
        icon: 'fa fa-file-text-o',
    },
    {
        id: 3,
        name: 'CheckStatus',
        url: '/check-status',
        icon: 'fa fa-check-square-o',
    },
   /* {
        id: 3,
        name: 'searchCaseLink',
        url: '/search-cases',
        icon: 'fa fa-search',
    },*/
/*    {
        id: 4,
        name: 'allCasesLink',
        url: '/cases',
        icon: 'fa fa-registered',
        children: [
            {
                id: 5,
                name: 'pendingCaseLink',
                url: '/cases/pending',
                icon: 'fa fa-qrcode'
            },
            {
                id: 6,
                name: 'blockedCaseLink',
                url: '/cases/blocked',
                icon: 'fa fa-lock'
            },
            {
                id: 7,
                name: 'recoveredCaseLink',
                url: '/cases/recovered',
                icon: 'fa fa-undo'
            },
        ]
    },*/

  ]
};
