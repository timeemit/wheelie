set :application, "wheelie.js"
set :repository,  "git@github.com:timeemit/DesignersCircus.git"
set :ip_address, "50.57.115.223"
set :deploy_to, "/home/oricksum/public_html/#{application}"
set :user, "oricksum"
set :port, 30000
set :scm_username, "timeemit"
set :scm, :git

default_run_options[:pty] = true

server ip_address, :app, :web
role :db, ip_address, :primary => true

# role :web, "your web-server here"                          # Your HTTP server, Apache/etc
# role :app, "your app-server here"                          # This may be the same as your `Web` server
# role :db,  "your primary db-server here", :primary => true # This is where Rails migrations will run
# role :db,  "your slave db-server here"

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

namespace :deploy do
  [:stop, :start, :restart, :reload].each do |action|
    desc "#{action.to_s.capitalize} Apache"
    task action, :roles => :web do
      invoke_command "/etc/init.d/apache2 #{action.to_s}", :via => run_method
    end
  end
end
