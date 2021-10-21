echo "packaging todo_api lambda"

pushd ./
npm install
npm run build
cp package.json ./dist/package.json
cp package-lock.json ./dist/package-lock.json

pushd ./src
if [ -d "public" ]; then
  cp -r public ./dist/public
fi
popd

pushd ./dist
npm install --prod
popd

zip -r -q todo_api.zip dist
mv todo_api.zip ./terraform/todo_api.zip

popd