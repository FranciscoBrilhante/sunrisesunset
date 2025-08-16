require "test_helper"

class CitiesControllerTest < ActionDispatch::IntegrationTest
  test "should return 2 cities starting with 'lis'" do 
    get "/cities/search", params: { location: "lis"} 
    body = JSON.parse(@response.body) 
    assert_equal 2, body["cities"].length 
  end

  test "should return 0 cities starting with 'far'" do 
    get "/cities/search", params: { location: "far"} 
    body = JSON.parse(@response.body) 
    assert_equal 0, body["cities"].length 
  end

  test "should return error if location param is lacking" do
    get "/cities/search"
    assert_response :unprocessable_content
    body = JSON.parse(@response.body)
    assert_equal ["Location can't be blank"], body["errors"]
  end
end
