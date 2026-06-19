import pytest

class TestHttpBinAPI:

    def test_get_endpoint(self, api_client):
        params = {"user": "qa_tester", "role": "sdet"}
        response = api_client.get("get", params=params)
        
        assert response.status_code == 200
        response_data = response.json()
        assert response_data["args"]["user"] == "qa_tester"
        assert response_data["args"]["role"] == "sdet"

    def test_post_endpoint(self, api_client):
        payload = {"item": "book", "quantity": 3}
        response = api_client.post("post", json_data=payload)
        
        assert response.status_code == 200
        response_data = response.json()
        assert response_data["json"]["item"] == "book"
        assert response_data["json"]["quantity"] == 3

    def test_put_endpoint(self, api_client):
        payload = {"status": "updated"}
        response = api_client.put("put", json_data=payload)
        
        assert response.status_code == 200
        response_data = response.json()
        assert response_data["json"]["status"] == "updated"

    def test_delete_endpoint(self, api_client):
        response = api_client.delete("delete")
        assert response.status_code == 200