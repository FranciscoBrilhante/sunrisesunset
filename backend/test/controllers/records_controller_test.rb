require "test_helper"

class RecordsControllerTest < ActionDispatch::IntegrationTest
  test "should return success" do
    get "/records/show", params: { location: "Porto", start_date: "16-08-2025", end_date: "16-08-2025"}
    assert_response :success
    assert_equal "application/json; charset=utf-8", @response.content_type
  end

  test "should create new Record once" do
    assert_difference("Record.count") do
      get "/records/show", params: { location: "Porto", start_date: "16-08-2025", end_date: "16-08-2025"}
    end
    
    assert_no_difference("Record.count") do
      get "/records/show", params: { location: "Porto", start_date: "16-08-2025", end_date: "16-08-2025"}
    end
  end

  test "should find cached row" do
    assert_no_difference("Record.count") do
      get "/records/show", params: { location: "Coimbra", start_date: "16-08-2025", end_date: "16-08-2025"}
    end
  end

  test "should return error if location param is lacking" do
    get "/records/show", params: { start_date: "16-08-2025", end_date: "16-08-2025" }
    assert_response :unprocessable_content
    body = JSON.parse(@response.body)
    assert_equal ["Location can't be blank"], body["errors"]
  end

  test "should return error if start_date after end_date" do
    get "/records/show", params: {location: "Porto", start_date: "17-08-2025", end_date: "16-08-2025" }
    assert_response :unprocessable_content
    body = JSON.parse(@response.body)
    assert_equal ["Start must be before end date"], body["errors"]
  end

  test "should return error if location not in database" do
    get "/records/show", params: {location: "Porto Lisbon", start_date: "16-08-2025", end_date: "16-08-2025" }
    assert_response :not_found
    body = JSON.parse(@response.body)
    assert_equal ["city doesnt exist"], body["errors"]
  end

  test "should return error if data range > 14" do
    get "/records/show", params: {location: "Porto Lisbon", start_date: "16-08-2025", end_date: "16-09-2025" }
    assert_response :unprocessable_content
    body = JSON.parse(@response.body)
    assert_equal ["Start max date range exceeded (14)"], body["errors"]
  end
end
