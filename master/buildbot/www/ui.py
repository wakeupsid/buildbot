# This file is part of Buildbot.  Buildbot is free software: you can
# redistribute it and/or modify it under the terms of the GNU General Public
# License as published by the Free Software Foundation, version 2.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
# details.
#
# You should have received a copy of the GNU General Public License along with
# this program; if not, write to the Free Software Foundation, Inc., 51
# Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
#
# Copyright Buildbot Team Members

import os
from twisted.python import util
from buildbot.www import resource

html = """\
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <link rel="stylesheet" type="text/css" href="%(baseurl)sstatic/css/default.css" />
        <link rel="stylesheet" type="text/css" href="%(baseurl)sstatic/css/bootstrap.css" />
        <script src="/static/js/default/dojo/dojo.js" data-dojo-config="async: true"></script>
        <script src="/static/js/buildbot.js" data-dojo-config="async: true"></script>
        <script>
          var ws_url = "%(baseurl)s".replace(/^http:/, "ws:");
        </script>
    </head>
  <body>
    <div class="container">
      <div id="header" class="row-fluid">
        <div id="changes_slider" class="span2 slider">Changes</div>
        <div id="builders_slider" class="span2 slider">Builders</div>
        <div  id="buildslaves_slider" class="span2 slider">Buildslaves</div>
        <div id="masters_slider" class="span2 slider">Masters</div>
      </div>
      <br/>

      <div id="contents">
        <div id="changes">
          <div id="grid"></div>
          <button id="changesButton">Load More Changes</button><br />
        </div>
        <div id="builders">Builders Info</div>
        <div id="buildslaves">Buildslaves Info</div>
        <div id="masters">Masters Info</div>
      </div>

      <div>
        <div id="message"></div>
        <div id="info"></div>
        <div id="status"></div>
      </div>
    </div>
  </body>
</html>
"""

class UIResource(resource.Resource):
    isLeaf = True

    def __init__(self, master):
        resource.Resource.__init__(self, master)

        self.jsdir = os.path.join(util.sibpath(__file__, 'static'), 'js')

    def render(self, request):
        contents = dict(
            baseurl = self.baseurl)
        return html % contents
