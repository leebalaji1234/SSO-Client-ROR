module ApplicationHelper

	def getusername
	  	if user_signed_in? 
	  		# @username = current_user.name ? current_user.name : current_user.email.split("@")[0]
	  		@username = current_user.name ? current_user.name : current_user.email.split("@")[0]
	  	end
	  	# raise current_user.inspect
	  	# capitalize
	 end
	
end
