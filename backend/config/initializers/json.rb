# Configure JSON compatibility for Rails 7.2 with json 3.x.
#
# Rails' ActiveSupport JSON decoder passes the legacy `quirks_mode`
# option to JSON.parse. JSON 3.x no longer accepts that option.
# The application only needs standard JSON encoding/decoding.

module JsonCompatibility
  def decode(json)
    JSON.parse(json)
  end
end

ActiveSupport::JSON.singleton_class.prepend(JsonCompatibility)
