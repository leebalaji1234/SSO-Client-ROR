module ApplicationHelper

	def getusername
	  	if user_signed_in? 
	  		@username = current_user.email.split("@")[0]
	  	end
	 end
	
end
