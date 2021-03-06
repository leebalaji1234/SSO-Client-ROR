require 'bcrypt'
class User < ActiveRecord::Base
    
  # include Devise::Models::DatabaseAuthenticatable
   alias_attribute :password, :encrypted_password
   alias_attribute :username, :email
   # alias_attribute :encrypted_password, :password
   before_create :add_default_values

   TEMP_EMAIL_PREFIX = 'change@me'
   TEMP_EMAIL_REGEX = /\Achange@me/
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # , :database_authenticatable
  devise :cas_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,:omniauthable,:omniauth_providers => [:google_oauth2,:facebook,:twitter]
 
  validates_format_of :email, :without => TEMP_EMAIL_REGEX, on: :update

  def self.find_for_oauth(auth, signed_in_resource = nil)
  	   
  	    identity = Identity.find_for_oauth(auth)
  	    user = signed_in_resource ? signed_in_resource : identity.user
  	    if user.nil?
  	        email_is_verified = auth.info.email && (auth.info.verified || auth.info.verified_email)  
  	        email = auth.info.email if email_is_verified  
  	        user = User.where(:email => email).first if email
  	        if user.nil?
  	        	user = User.new(
				          name: auth.extra.raw_info.name,
				          #username: auth.info.nickname || auth.uid,
				          email: email ? email : "#{TEMP_EMAIL_PREFIX}-#{auth.uid}-#{auth.provider}.com",
				          password: Devise.friendly_token[0,20]
				        )
             # user.skip_confirmation!
             user.save!
           end
         end

    # Associate the identity with the user if needed
    if identity.user != user
      identity.user = user
      identity.save!
    end
    user
  end

  def email_verified?
    self.email && self.email !~ TEMP_EMAIL_REGEX
  end
  def add_default_values
    my_password = BCrypt::Password.create(self.password)
    self.encrypted_password = my_password
  end
end


