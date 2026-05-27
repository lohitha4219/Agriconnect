# TODO
- [x] Fix `api/models.py`: remove duplicate model definitions and align fields with `api/views.py` (notably `CropUpload.crop_name`).

- [x] Verify model import and endpoint wiring by running `python manage.py check`.

- [ ] If needed, run `python manage.py makemigrations` and `python manage.py migrate`.
- [x] Run a minimal runtime test: start server or invoke lightweight commands to confirm no crashes.


